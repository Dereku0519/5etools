"use strict";

class PageFilterCharCreationOptions extends PageFilter {
	constructor () {
		super();
		this._miscFilter = new Filter({header: "Miscellaneous", items: ["SRD", "Has Images", "Has Info"], isSrdFilter: true});
	}

	static mutateForFilters (it) {
		it._dOptionType = Parser.charCreationOptionTypeToFull(it.optionType);
		it._fMisc = it.srd ? ["SRD"] : [];
		if (it.hasFluff) it._fMisc.push("Has Info");
		if (it.hasFluffImages) it._fMisc.push("Has Images");
	}

	addToFilters (it, isExcluded) {
		if (isExcluded) return;

		this._sourceFilter.addItem(it.source);
	}

	async _pPopulateBoxOptions (opts) {
		opts.filters = [
			this._sourceFilter,
			this._miscFilter,
		];
	}

	toDisplay (values, it) {
		return this._filterBox.toDisplay(
			values,
			it.source,
			it._fMisc,
		)
	}
}
