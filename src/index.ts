//--------Profit per labourer--------//
const tableBlacksmith = document.querySelectorAll('.blacksmith');
const tableFletcher = document.querySelectorAll('.fletcher');
const tableImbuer = document.querySelectorAll('.imbuer');
const tableTinker = document.querySelectorAll('.tinker');

const tablePlanks = document.querySelectorAll('.planks');
const tableMetalBar = document.querySelectorAll('.metal-bar');
const tableCloth = document.querySelectorAll('.cloth');
const tableLeather = document.querySelectorAll('.leather');

const ResourceProportion: readonly number[][] = [
	//[planks, metal bar, cloth, leather]
	[20, 68.69, 11.11, 0],
	[26.67, 26.67, 0, 46.66],
	[40, 11.11, 48.89, 0],
	[44.44, 22.22, 22.22, 11.11],
];

const baseReturnYield: readonly number[] = [16, 8, 5.3333, 4.4651, 4.129]; //return at 100% happiness

const averageEnchanted: readonly number[] = [94.45, 5, 0.5, 0.05]; //enchanted material percentage

let weightedCostSummary: number[][] = [[], [], [], []]; //weighted cost table in form of an array
let profitSummary: number[][] = [[], [], [], []]; //weighted cost table in form of an array

function update(): void {
	const city = document.getElementById('city') as HTMLSelectElement;
	const cityOption: string = city.options[city.selectedIndex].value;

	getData(cityOption);
}

async function getData(city: string) {
	try {
		const response = await fetch(
			`https://www.albion-online-data.com/api/v2/stats/prices/T1_WOOD,T1_ROCK,T2_STONEBLOCK,T3_STONEBLOCK,T4_STONEBLOCK,T5_STONEBLOCK,T6_STONEBLOCK,T7_STONEBLOCK,T8_STONEBLOCK,T2_FURNITUREITEM_BED,T2_FURNITUREITEM_TABLE,T3_FURNITUREITEM_BED,T3_FURNITUREITEM_TABLE,T4_FURNITUREITEM_BED,T4_FURNITUREITEM_TABLE,T5_FURNITUREITEM_BED,T5_FURNITUREITEM_TABLE,T6_FURNITUREITEM_BED,T6_FURNITUREITEM_TABLE,T7_FURNITUREITEM_BED,T7_FURNITUREITEM_TABLE,T8_FURNITUREITEM_BED,T8_FURNITUREITEM_TABLE,T4_PLANKS,T5_PLANKS,T6_PLANKS,T7_PLANKS,T8_PLANKS,T4_PLANKS_LEVEL1@1,T5_PLANKS_LEVEL1@1,T6_PLANKS_LEVEL1@1,T7_PLANKS_LEVEL1@1,T8_PLANKS_LEVEL1@1,T4_PLANKS_LEVEL2@2,T5_PLANKS_LEVEL2@2,T6_PLANKS_LEVEL2@2,T7_PLANKS_LEVEL2@2,T8_PLANKS_LEVEL2@2,T4_PLANKS_LEVEL3@3,T5_PLANKS_LEVEL3@3,T6_PLANKS_LEVEL3@3,T7_PLANKS_LEVEL3@3,T8_PLANKS_LEVEL3@3,T4_METALBAR,T5_METALBAR,T6_METALBAR,T7_METALBAR,T8_METALBAR,T4_METALBAR_LEVEL1@1,T5_METALBAR_LEVEL1@1,T6_METALBAR_LEVEL1@1,T7_METALBAR_LEVEL1@1,T8_METALBAR_LEVEL1@1,T4_METALBAR_LEVEL2@2,T5_METALBAR_LEVEL2@2,T6_METALBAR_LEVEL2@2,T7_METALBAR_LEVEL2@2,T8_METALBAR_LEVEL2@2,T4_METALBAR_LEVEL3@3,T5_METALBAR_LEVEL3@3,T6_METALBAR_LEVEL3@3,T7_METALBAR_LEVEL3@3,T8_METALBAR_LEVEL3@3,T4_LEATHER,T5_LEATHER,T6_LEATHER,T7_LEATHER,T8_LEATHER,T4_LEATHER_LEVEL1@1,T5_LEATHER_LEVEL1@1,T6_LEATHER_LEVEL1@1,T7_LEATHER_LEVEL1@1,T8_LEATHER_LEVEL1@1,T4_LEATHER_LEVEL2@2,T5_LEATHER_LEVEL2@2,T6_LEATHER_LEVEL2@2,T7_LEATHER_LEVEL2@2,T8_LEATHER_LEVEL2@2,T4_LEATHER_LEVEL3@3,T5_LEATHER_LEVEL3@3,T6_LEATHER_LEVEL3@3,T7_LEATHER_LEVEL3@3,T8_LEATHER_LEVEL3@3,T4_CLOTH,T5_CLOTH,T6_CLOTH,T7_CLOTH,T8_CLOTH,T4_CLOTH_LEVEL1@1,T5_CLOTH_LEVEL1@1,T6_CLOTH_LEVEL1@1,T7_CLOTH_LEVEL1@1,T8_CLOTH_LEVEL1@1,T4_CLOTH_LEVEL2@2,T5_CLOTH_LEVEL2@2,T6_CLOTH_LEVEL2@2,T7_CLOTH_LEVEL2@2,T8_CLOTH_LEVEL2@2,T4_CLOTH_LEVEL3@3,T5_CLOTH_LEVEL3@3,T6_CLOTH_LEVEL3@3,T7_CLOTH_LEVEL3@3,T8_CLOTH_LEVEL3@3,T4_JOURNAL_WARRIOR_FULL,T5_JOURNAL_WARRIOR_FULL,T6_JOURNAL_WARRIOR_FULL,T7_JOURNAL_WARRIOR_FULL,T8_JOURNAL_WARRIOR_FULL,T4_JOURNAL_HUNTER_FULL,T5_JOURNAL_HUNTER_FULL,T6_JOURNAL_HUNTER_FULL,T7_JOURNAL_HUNTER_FULL,T8_JOURNAL_HUNTER_FULL,T4_JOURNAL_MAGE_FULL,T5_JOURNAL_MAGE_FULL,T6_JOURNAL_MAGE_FULL,T7_JOURNAL_MAGE_FULL,T8_JOURNAL_MAGE_FULL,T4_JOURNAL_TOOLMAKER_FULL,T5_JOURNAL_TOOLMAKER_FULL,T6_JOURNAL_TOOLMAKER_FULL,T7_JOURNAL_TOOLMAKER_FULL,T8_JOURNAL_TOOLMAKER_FULL,T4_JOURNAL_WARRIOR_EMPTY,T5_JOURNAL_WARRIOR_EMPTY,T6_JOURNAL_WARRIOR_EMPTY,T7_JOURNAL_WARRIOR_EMPTY,T8_JOURNAL_WARRIOR_EMPTY,T4_JOURNAL_HUNTER_EMPTY,T5_JOURNAL_HUNTER_EMPTY,T6_JOURNAL_HUNTER_EMPTY,T7_JOURNAL_HUNTER_EMPTY,T8_JOURNAL_HUNTER_EMPTY,T4_JOURNAL_MAGE_EMPTY,T5_JOURNAL_MAGE_EMPTY,T6_JOURNAL_MAGE_EMPTY,T7_JOURNAL_MAGE_EMPTY,T8_JOURNAL_MAGE_EMPTY,T4_JOURNAL_TOOLMAKER_EMPTY,T5_JOURNAL_TOOLMAKER_EMPTY,T6_JOURNAL_TOOLMAKER_EMPTY,T7_JOURNAL_TOOLMAKER_EMPTY,T8_JOURNAL_TOOLMAKER_EMPTY?locations=${city}&qualities=1`,
			{
				method: 'GET',
				mode: 'cors',
				referrerPolicy: 'no-referrer',
			}
		);
		const responseJson = await response.json();
		weightedCost(responseJson);
		calculateProfit(responseJson);
		calculateBuildCost(responseJson);
	} catch (error) {}
}

const weightedCost = (data: { sell_price_min: number }[]): void => {
	weightedCostSummary = [[], [], [], []]; // empty previous weightedCost array

	tablePlanks.forEach((product, index) => {
		let average: number[] = [];
		for (let i = 0; i < 4; i++) {
			average.push(
				data[30 + 27 * index + i].sell_price_min * (averageEnchanted[i] / 100)
			);
		}
		if (!average.some((el) => el === 0)) (product as HTMLElement).style.color = 'orange';
		let productAverage: number = average.reduce((a, b) => a + b, 0);

		product.innerHTML = new Intl.NumberFormat('de-DE').format(Math.floor(productAverage));
		weightedCostSummary[0].push(productAverage);
	});
	tableMetalBar.forEach((product, index) => {
		let average: number[] = [];
		for (let i = 0; i < 4; i++) {
			average.push(
				data[26 + 27 * index + i].sell_price_min * (averageEnchanted[i] / 100)
			);
		}
		if (!average.some((el) => el === 0)) (product as HTMLElement).style.color = 'orange';

		let productAverage: number = average.reduce((a, b) => a + b, 0);
		product.innerHTML = new Intl.NumberFormat('de-DE').format(Math.floor(productAverage));
		weightedCostSummary[1].push(productAverage);
	});
	tableCloth.forEach((product, index) => {
		let average: number[] = [];
		for (let i = 0; i < 4; i++) {
			average.push(data[8 + 27 * index + i].sell_price_min * (averageEnchanted[i] / 100));
		}
		if (!average.some((el) => el === 0)) (product as HTMLElement).style.color = 'orange';

		let productAverage: number = average.reduce((a, b) => a + b, 0);
		product.innerHTML = new Intl.NumberFormat('de-DE').format(Math.floor(productAverage));
		weightedCostSummary[2].push(productAverage);
	});
	tableLeather.forEach((product, index) => {
		let average: number[] = [];
		for (let i = 0; i < 4; i++) {
			average.push(
				data[22 + 27 * index + i].sell_price_min * (averageEnchanted[i] / 100)
			);
		}
		if (!average.some((el) => el === 0)) (product as HTMLElement).style.color = 'orange';
		let productAverage: number = average.reduce((a, b) => a + b, 0);
		product.innerHTML = new Intl.NumberFormat('de-DE').format(Math.floor(productAverage));
		weightedCostSummary[3].push(productAverage);
	});
};

const calculateProfit = (data: { sell_price_min: number }[]): void => {
	profitSummary = [[], [], [], []]; // empty previous profit array

	const happiness = document.getElementById('happiness') as HTMLInputElement;
	const happinessValue: number = parseInt(happiness.value) / 100;

	const marketTax = document.getElementById('tax') as HTMLSelectElement;
	const marketTaxValue: number = parseInt(marketTax.value) / 100;

	tableBlacksmith.forEach((product, index) => {
		let sum: number[] = [];
		for (let j = 0; j < 4; j++) {
			sum.push(
				(ResourceProportion[0][j] / 100) *
					(baseReturnYield[index] * happinessValue) *
					weightedCostSummary[j][index]
			);
		}
		let productProfit =
			(sum.reduce((a, b) => a + b, 0) +
				data[20 + 27 * index].sell_price_min -
				data[21 + 27 * index].sell_price_min) *
			(1 - marketTaxValue);
		profitSummary[0].push(productProfit);

		if (productProfit < 0) (product as HTMLElement).style.color = 'red';
		product.innerHTML = new Intl.NumberFormat('de-DE').format(Math.floor(productProfit));

		sum = [];
	});
	tableFletcher.forEach((product, index) => {
		let sum: number[] = [];
		for (let j = 0; j < 4; j++) {
			sum.push(
				(ResourceProportion[1][j] / 100) *
					(baseReturnYield[index] * happinessValue) *
					weightedCostSummary[j][index]
			);
		}
		let productProfit =
			(sum.reduce((a, b) => a + b, 0) +
				data[14 + 27 * index].sell_price_min -
				data[15 + 27 * index].sell_price_min) *
			(1 - marketTaxValue);
		profitSummary[1].push(productProfit);

		if (productProfit < 0) (product as HTMLElement).style.color = 'red';
		product.innerHTML = new Intl.NumberFormat('de-DE').format(Math.floor(productProfit));

		sum = [];
	});
	tableImbuer.forEach((product, index) => {
		let sum: number[] = [];
		for (let j = 0; j < 4; j++) {
			sum.push(
				(ResourceProportion[2][j] / 100) *
					(baseReturnYield[index] * happinessValue) *
					weightedCostSummary[j][index]
			);
		}
		let productProfit =
			(sum.reduce((a, b) => a + b, 0) +
				data[26 + 27 * index].sell_price_min -
				data[27 + 27 * index].sell_price_min) *
			(1 - marketTaxValue);
		profitSummary[2].push(productProfit);

		if (productProfit < 0) (product as HTMLElement).style.color = 'red';
		product.innerHTML = new Intl.NumberFormat('de-DE').format(Math.floor(productProfit));

		sum = [];
	});
	tableTinker.forEach((product, index) => {
		let sum: number[] = [];
		for (let j = 0; j < 4; j++) {
			sum.push(
				(ResourceProportion[3][j] / 100) *
					(baseReturnYield[index] * happinessValue) *
					weightedCostSummary[j][index]
			);
		}
		let productProfit =
			(sum.reduce((a, b) => a + b, 0) +
				data[18 + 27 * index].sell_price_min -
				data[19 + 27 * index].sell_price_min) *
			(1 - marketTaxValue);
		profitSummary[3].push(productProfit);

		if (productProfit < 0) (product as HTMLElement).style.color = 'red';
		product.innerHTML = new Intl.NumberFormat('de-DE').format(Math.floor(productProfit));

		sum = [];
	});
};

//--------Payback return period--------//

const tableTotal = document.querySelectorAll('.total');
const tablePayback = document.querySelectorAll('.payback');

const calculateBuildCost = (data: { sell_price_min: number }[]): void => {
	const labourerType = document.getElementById('labourer') as HTMLSelectElement;
	const labourerTypeOption: string =
		labourerType.options[labourerType.selectedIndex].value;

	const t4House: number =
		data[0].sell_price_min * 12 +
		data[1].sell_price_min * 120 +
		data[4].sell_price_min * 180 +
		data[7].sell_price_min * 180 +
		data[34].sell_price_min * 180;

	let wood = 240;
	let stone = 24;
	let sum: number[] = [t4House];
	tableTotal.forEach((product, index) => {
		// house build material
		const basicMaterial = data[0].sell_price_min * stone + data[1].sell_price_min * wood;
		const currentHouse = basicMaterial + data[61 + index * 27].sell_price_min * 180;
		sum.push(currentHouse);
		if (wood < 1920) wood = wood * 2;
		if (stone < 192) stone = stone * 2;

		// house furniture
		const table = data[40 + index * 27].sell_price_min;
		const bed = data[39 + index * 27].sell_price_min;

		const houseWithFurniture = sum.reduce((a, b) => a + b, 0) + table + bed * 3;

		product.innerHTML = new Intl.NumberFormat('de-DE').format(
			Math.floor(houseWithFurniture)
		);

		// average profit
		let averageProfit: number = 0;
		for (let j = 0; j < profitSummary.length; j++) {
			averageProfit = averageProfit + profitSummary[j][index];
		}

		switch (labourerTypeOption) {
			case 'average':
				paybackTime(index, houseWithFurniture, averageProfit / 4);
				break;
			case 'blacksmith':
				paybackTime(index, houseWithFurniture, profitSummary[0][index]);
				break;
			case 'fletcher':
				paybackTime(index, houseWithFurniture, profitSummary[1][index]);
				break;
			case 'imbuer':
				paybackTime(index, houseWithFurniture, profitSummary[2][index]);
				break;
			case 'tinker':
				paybackTime(index, houseWithFurniture, profitSummary[3][index]);
				break;
			default:
				paybackTime(index, houseWithFurniture, averageProfit / 4);
				break;
		}
	});
	function paybackTime(index: number, total: number, labourers: number) {
		tablePayback[index].innerHTML = (total / (labourers * 3)).toFixed(0);
	}
};

// initial data
getData('caerleon');
