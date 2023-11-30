Parser.getSpeedString = (it) => {
	if (it.speed == null) return "\u2014";

	function procSpeed (propName) {
		function addSpeed (s) {
			stack.push(`${propName === "walk" ? "" : `${Parser.SpeedToDisplay(propName)} `}${getVal(s)} 尺${getCond(s)}`);
		}

		if (it.speed[propName] || propName === "walk") addSpeed(it.speed[propName] || 0);
		if (it.speed.alternate && it.speed.alternate[propName]) it.speed.alternate[propName].forEach(addSpeed);
	}

	function getVal (speedProp) {
		return speedProp.number != null ? speedProp.number : speedProp;
	}

	function getCond (speedProp) {
		return speedProp.condition ? ` ${Renderer.get().render(speedProp.condition)}` : "";
	}

	const stack = [];
	if (typeof it.speed === "object") {
		let joiner = ", ";
        Parser.SPEED_MODES.filter(mode=>!ent.speed.hidden?.includes(mode)).forEach(mode=>Parser._getSpeedString_addSpeedMode({
            ent,
            prop: mode,
            stack,
            isMetric,
            isSkipZeroWalk,
            unit
        }));
		procSpeed("walk");
		procSpeed("burrow");
		procSpeed("climb");
		procSpeed("fly");
		procSpeed("swim");
		if (it.speed.choose) {
			joiner = "; ";
			stack.push(`${it.speed.choose.from.sort().joinConjunct("、", "或")} ${it.speed.choose.amount} ft.${it.speed.choose.note ? ` ${it.speed.choose.note}` : ""}`);
		}
		return stack.join(joiner) + (it.speed.note ? ` ${it.speed.note}` : "");
	} else {
		return it.speed + (it.speed === "Varies" ? "" : " 尺");
	}
};