const tableBlacksmith = document.querySelectorAll('.blacksmith');
const tableFletcher = document.querySelectorAll('.fletcher');
const tableImbuer = document.querySelectorAll('.imbuer');
const tableTinker = document.querySelectorAll('.tinker');

const tablePlanks = document.querySelectorAll('.planks');
const tableMetalBar = document.querySelectorAll('.metal-bar');
const tableCloth = document.querySelectorAll('.cloth');
const tableLeather = document.querySelectorAll('.leather');

const ResourceProportion = [ //[planks, metal bar, cloth, leather]
	[20, 68.69, 11.11, 0],
	[26.67, 26.67, 0, 46.66],
	[40, 11.11, 48.89, 0],
	[44.44, 22.22, 22.22, 11.11],
];

const baseReturnYield = [16, 8, 5.3333, 4.4651, 4.129]; //return at 100% happiness

const averageEnchanted = [94.45, 5, 0.5, 0.05]; 

let weightedCostSummary: number[][] = [[], [], [], []];

async function getData(city: string) {
	try {
		const response = await fetch(
			`https://www.albion-online-data.com/api/v2/stats/prices/T4_PLANKS,T5_PLANKS,T6_PLANKS,T7_PLANKS,T8_PLANKS,T4_PLANKS_LEVEL1@1,T5_PLANKS_LEVEL1@1,T6_PLANKS_LEVEL1@1,T7_PLANKS_LEVEL1@1,T8_PLANKS_LEVEL1@1,T4_PLANKS_LEVEL2@2,T5_PLANKS_LEVEL2@2,T6_PLANKS_LEVEL2@2,T7_PLANKS_LEVEL2@2,T8_PLANKS_LEVEL2@2,T4_PLANKS_LEVEL3@3,T5_PLANKS_LEVEL3@3,T6_PLANKS_LEVEL3@3,T7_PLANKS_LEVEL3@3,T8_PLANKS_LEVEL3@3,T4_METALBAR,T5_METALBAR,T6_METALBAR,T7_METALBAR,T8_METALBAR,T4_METALBAR_LEVEL1@1,T5_METALBAR_LEVEL1@1,T6_METALBAR_LEVEL1@1,T7_METALBAR_LEVEL1@1,T8_METALBAR_LEVEL1@1,T4_METALBAR_LEVEL2@2,T5_METALBAR_LEVEL2@2,T6_METALBAR_LEVEL2@2,T7_METALBAR_LEVEL2@2,T8_METALBAR_LEVEL2@2,T4_METALBAR_LEVEL3@3,T5_METALBAR_LEVEL3@3,T6_METALBAR_LEVEL3@3,T7_METALBAR_LEVEL3@3,T8_METALBAR_LEVEL3@3,T4_LEATHER,T5_LEATHER,T6_LEATHER,T7_LEATHER,T8_LEATHER,T4_LEATHER_LEVEL1@1,T5_LEATHER_LEVEL1@1,T6_LEATHER_LEVEL1@1,T7_LEATHER_LEVEL1@1,T8_LEATHER_LEVEL1@1,T4_LEATHER_LEVEL2@2,T5_LEATHER_LEVEL2@2,T6_LEATHER_LEVEL2@2,T7_LEATHER_LEVEL2@2,T8_LEATHER_LEVEL2@2,T4_LEATHER_LEVEL3@3,T5_LEATHER_LEVEL3@3,T6_LEATHER_LEVEL3@3,T7_LEATHER_LEVEL3@3,T8_LEATHER_LEVEL3@3,T4_CLOTH,T5_CLOTH,T6_CLOTH,T7_CLOTH,T8_CLOTH,T4_CLOTH_LEVEL1@1,T5_CLOTH_LEVEL1@1,T6_CLOTH_LEVEL1@1,T7_CLOTH_LEVEL1@1,T8_CLOTH_LEVEL1@1,T4_CLOTH_LEVEL2@2,T5_CLOTH_LEVEL2@2,T6_CLOTH_LEVEL2@2,T7_CLOTH_LEVEL2@2,T8_CLOTH_LEVEL2@2,T4_CLOTH_LEVEL3@3,T5_CLOTH_LEVEL3@3,T6_CLOTH_LEVEL3@3,T7_CLOTH_LEVEL3@3,T8_CLOTH_LEVEL3@3,T4_JOURNAL_WARRIOR_FULL,T5_JOURNAL_WARRIOR_FULL,T6_JOURNAL_WARRIOR_FULL,T7_JOURNAL_WARRIOR_FULL,T8_JOURNAL_WARRIOR_FULL,T4_JOURNAL_HUNTER_FULL,T5_JOURNAL_HUNTER_FULL,T6_JOURNAL_HUNTER_FULL,T7_JOURNAL_HUNTER_FULL,T8_JOURNAL_HUNTER_FULL,T4_JOURNAL_MAGE_FULL,T5_JOURNAL_MAGE_FULL,T6_JOURNAL_MAGE_FULL,T7_JOURNAL_MAGE_FULL,T8_JOURNAL_MAGE_FULL,T4_JOURNAL_TOOLMAKER_FULL,T5_JOURNAL_TOOLMAKER_FULL,T6_JOURNAL_TOOLMAKER_FULL,T7_JOURNAL_TOOLMAKER_FULL,T8_JOURNAL_TOOLMAKER_FULL,T4_JOURNAL_WARRIOR_EMPTY,T5_JOURNAL_WARRIOR_EMPTY,T6_JOURNAL_WARRIOR_EMPTY,T7_JOURNAL_WARRIOR_EMPTY,T8_JOURNAL_WARRIOR_EMPTY,T4_JOURNAL_HUNTER_EMPTY,T5_JOURNAL_HUNTER_EMPTY,T6_JOURNAL_HUNTER_EMPTY,T7_JOURNAL_HUNTER_EMPTY,T8_JOURNAL_HUNTER_EMPTY,T4_JOURNAL_MAGE_EMPTY,T5_JOURNAL_MAGE_EMPTY,T6_JOURNAL_MAGE_EMPTY,T7_JOURNAL_MAGE_EMPTY,T8_JOURNAL_MAGE_EMPTY,T4_JOURNAL_TOOLMAKER_EMPTY,T5_JOURNAL_TOOLMAKER_EMPTY,T6_JOURNAL_TOOLMAKER_EMPTY,T7_JOURNAL_TOOLMAKER_EMPTY,T8_JOURNAL_TOOLMAKER_EMPTY?locations=${city}&qualities=1`,
			{
				method: 'GET',
				mode: 'cors',
				referrerPolicy: 'no-referrer', 
			}
		);
		const responseJson = await response.json();
		console.log(responseJson);
		weightedCost(responseJson);
		calculateProfit(responseJson);
	} catch (error) {}
}

function update() {
	const city = document.getElementById('city') as HTMLSelectElement;
	const cityOption: string = city!.options[city!.selectedIndex].value;

	getData(cityOption);
}

const weightedCost = (data: { sell_price_min: number }[]) => {
    weightedCostSummary = [[], [], [], []];
    
	tablePlanks.forEach((product, index) => {
		let average: number[] = [];
		for (let i = 0; i < 4; i++) {
			average.push(
				data[20 + 24 * index + i].sell_price_min * (averageEnchanted[i] / 100)
			);
		}
		let productAverage: string = average.reduce((a, b) => a + b, 0).toFixed(2);

		product.innerHTML = productAverage;
		weightedCostSummary[0].push(parseInt(productAverage));
	});
	tableMetalBar.forEach((product, index) => {
		let average: number[] = [];
		for (let i = 0; i < 4; i++) {
			average.push(
				data[16 + 24 * index + i].sell_price_min * (averageEnchanted[i] / 100)
			);
		}
		let productAverage: string = average.reduce((a, b) => a + b, 0).toFixed(2);
		product.innerHTML = productAverage;
		weightedCostSummary[1].push(parseInt(productAverage));
	});
	tableCloth.forEach((product, index) => {
		let average: number[] = [];
		for (let i = 0; i < 4; i++) {
			average.push(data[0 + 24 * index + i].sell_price_min * (averageEnchanted[i] / 100));
		}
		let productAverage: string = average.reduce((a, b) => a + b, 0).toFixed(2);
		product.innerHTML = productAverage;
		weightedCostSummary[2].push(parseInt(productAverage));
	});
	tableLeather.forEach((product, index) => {
		let average: number[] = [];
		for (let i = 0; i < 4; i++) {
			average.push(
				data[12 + 24 * index + i].sell_price_min * (averageEnchanted[i] / 100)
			);
		}
		let productAverage: string = average.reduce((a, b) => a + b, 0).toFixed(2);
		product.innerHTML = productAverage;
		weightedCostSummary[3].push(parseInt(productAverage));
	});
};

const calculateProfit = (data: { sell_price_min: number }[]) => {
	const happiness = document.getElementById('happiness') as HTMLInputElement;
	const happinessValue: number = parseInt(happiness.value) / 100;

	const marketTax = document.getElementById('tax')! as HTMLSelectElement;
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
			sum.reduce((a, b) => a + b, 0) + data[10 + 24 * index].sell_price_min;
		product.innerHTML = (
			(productProfit - data[11 + 24 * index].sell_price_min) *
			(1 - marketTaxValue)
		).toFixed(2);
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
			sum.reduce((a, b) => a + b, 0) + data[4 + 24 * index].sell_price_min;
		product.innerHTML = (
			(productProfit - data[5 + 24 * index].sell_price_min) *
			(1 - marketTaxValue)
		).toFixed(2);
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
			sum.reduce((a, b) => a + b, 0) + data[6 + 24 * index].sell_price_min;
		product.innerHTML = (
			(productProfit - data[7 + 24 * index].sell_price_min) *
			(1 - marketTaxValue)
		).toFixed(2);
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
			sum.reduce((a, b) => a + b, 0) + data[8 + 24 * index].sell_price_min;
		product.innerHTML = (
			(productProfit - data[9 + 24 * index].sell_price_min) *
			(1 - marketTaxValue)
		).toFixed(2);
		sum = [];
	});
};

getData('caerleon'); // initial data
