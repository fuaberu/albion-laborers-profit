"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var tableBlacksmith = document.querySelectorAll('.blacksmith');
var tableFletcher = document.querySelectorAll('.fletcher');
var tableImbuer = document.querySelectorAll('.imbuer');
var tableTinker = document.querySelectorAll('.tinker');
var tablePlanks = document.querySelectorAll('.planks');
var tableMetalBar = document.querySelectorAll('.metal-bar');
var tableCloth = document.querySelectorAll('.cloth');
var tableLeather = document.querySelectorAll('.leather');
var ResourceProportion = [
    [20, 68.69, 11.11, 0],
    [26.67, 26.67, 0, 46.66],
    [40, 11.11, 48.89, 0],
    [44.44, 22.22, 22.22, 11.11],
];
var baseReturnYield = [16, 8, 5.3333, 4.4651, 4.129]; //return at 100% happiness
var averageEnchanted = [94.45, 5, 0.5, 0.05];
var weightedCostSummary = [[], [], [], []];
function getData(city) {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://www.albion-online-data.com/api/v2/stats/prices/T4_PLANKS,T5_PLANKS,T6_PLANKS,T7_PLANKS,T8_PLANKS,T4_PLANKS_LEVEL1@1,T5_PLANKS_LEVEL1@1,T6_PLANKS_LEVEL1@1,T7_PLANKS_LEVEL1@1,T8_PLANKS_LEVEL1@1,T4_PLANKS_LEVEL2@2,T5_PLANKS_LEVEL2@2,T6_PLANKS_LEVEL2@2,T7_PLANKS_LEVEL2@2,T8_PLANKS_LEVEL2@2,T4_PLANKS_LEVEL3@3,T5_PLANKS_LEVEL3@3,T6_PLANKS_LEVEL3@3,T7_PLANKS_LEVEL3@3,T8_PLANKS_LEVEL3@3,T4_METALBAR,T5_METALBAR,T6_METALBAR,T7_METALBAR,T8_METALBAR,T4_METALBAR_LEVEL1@1,T5_METALBAR_LEVEL1@1,T6_METALBAR_LEVEL1@1,T7_METALBAR_LEVEL1@1,T8_METALBAR_LEVEL1@1,T4_METALBAR_LEVEL2@2,T5_METALBAR_LEVEL2@2,T6_METALBAR_LEVEL2@2,T7_METALBAR_LEVEL2@2,T8_METALBAR_LEVEL2@2,T4_METALBAR_LEVEL3@3,T5_METALBAR_LEVEL3@3,T6_METALBAR_LEVEL3@3,T7_METALBAR_LEVEL3@3,T8_METALBAR_LEVEL3@3,T4_LEATHER,T5_LEATHER,T6_LEATHER,T7_LEATHER,T8_LEATHER,T4_LEATHER_LEVEL1@1,T5_LEATHER_LEVEL1@1,T6_LEATHER_LEVEL1@1,T7_LEATHER_LEVEL1@1,T8_LEATHER_LEVEL1@1,T4_LEATHER_LEVEL2@2,T5_LEATHER_LEVEL2@2,T6_LEATHER_LEVEL2@2,T7_LEATHER_LEVEL2@2,T8_LEATHER_LEVEL2@2,T4_LEATHER_LEVEL3@3,T5_LEATHER_LEVEL3@3,T6_LEATHER_LEVEL3@3,T7_LEATHER_LEVEL3@3,T8_LEATHER_LEVEL3@3,T4_CLOTH,T5_CLOTH,T6_CLOTH,T7_CLOTH,T8_CLOTH,T4_CLOTH_LEVEL1@1,T5_CLOTH_LEVEL1@1,T6_CLOTH_LEVEL1@1,T7_CLOTH_LEVEL1@1,T8_CLOTH_LEVEL1@1,T4_CLOTH_LEVEL2@2,T5_CLOTH_LEVEL2@2,T6_CLOTH_LEVEL2@2,T7_CLOTH_LEVEL2@2,T8_CLOTH_LEVEL2@2,T4_CLOTH_LEVEL3@3,T5_CLOTH_LEVEL3@3,T6_CLOTH_LEVEL3@3,T7_CLOTH_LEVEL3@3,T8_CLOTH_LEVEL3@3,T4_JOURNAL_WARRIOR_FULL,T5_JOURNAL_WARRIOR_FULL,T6_JOURNAL_WARRIOR_FULL,T7_JOURNAL_WARRIOR_FULL,T8_JOURNAL_WARRIOR_FULL,T4_JOURNAL_HUNTER_FULL,T5_JOURNAL_HUNTER_FULL,T6_JOURNAL_HUNTER_FULL,T7_JOURNAL_HUNTER_FULL,T8_JOURNAL_HUNTER_FULL,T4_JOURNAL_MAGE_FULL,T5_JOURNAL_MAGE_FULL,T6_JOURNAL_MAGE_FULL,T7_JOURNAL_MAGE_FULL,T8_JOURNAL_MAGE_FULL,T4_JOURNAL_TOOLMAKER_FULL,T5_JOURNAL_TOOLMAKER_FULL,T6_JOURNAL_TOOLMAKER_FULL,T7_JOURNAL_TOOLMAKER_FULL,T8_JOURNAL_TOOLMAKER_FULL,T4_JOURNAL_WARRIOR_EMPTY,T5_JOURNAL_WARRIOR_EMPTY,T6_JOURNAL_WARRIOR_EMPTY,T7_JOURNAL_WARRIOR_EMPTY,T8_JOURNAL_WARRIOR_EMPTY,T4_JOURNAL_HUNTER_EMPTY,T5_JOURNAL_HUNTER_EMPTY,T6_JOURNAL_HUNTER_EMPTY,T7_JOURNAL_HUNTER_EMPTY,T8_JOURNAL_HUNTER_EMPTY,T4_JOURNAL_MAGE_EMPTY,T5_JOURNAL_MAGE_EMPTY,T6_JOURNAL_MAGE_EMPTY,T7_JOURNAL_MAGE_EMPTY,T8_JOURNAL_MAGE_EMPTY,T4_JOURNAL_TOOLMAKER_EMPTY,T5_JOURNAL_TOOLMAKER_EMPTY,T6_JOURNAL_TOOLMAKER_EMPTY,T7_JOURNAL_TOOLMAKER_EMPTY,T8_JOURNAL_TOOLMAKER_EMPTY?locations=" + city + "&qualities=1", {
                            method: 'GET',
                            mode: 'cors',
                            referrerPolicy: 'no-referrer',
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseJson = _a.sent();
                    console.log(responseJson);
                    weightedCost(responseJson);
                    calculateProfit(responseJson);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function update() {
    var city = document.getElementById('city');
    var cityOption = city.options[city.selectedIndex].value;
    getData(cityOption);
}
var weightedCost = function (data) {
    weightedCostSummary = [[], [], [], []];
    tablePlanks.forEach(function (product, index) {
        var average = [];
        for (var i = 0; i < 4; i++) {
            average.push(data[20 + 24 * index + i].sell_price_min * (averageEnchanted[i] / 100));
        }
        var productAverage = average.reduce(function (a, b) { return a + b; }, 0).toFixed(2);
        product.innerHTML = productAverage;
        weightedCostSummary[0].push(parseInt(productAverage));
    });
    tableMetalBar.forEach(function (product, index) {
        var average = [];
        for (var i = 0; i < 4; i++) {
            average.push(data[16 + 24 * index + i].sell_price_min * (averageEnchanted[i] / 100));
        }
        var productAverage = average.reduce(function (a, b) { return a + b; }, 0).toFixed(2);
        product.innerHTML = productAverage;
        weightedCostSummary[1].push(parseInt(productAverage));
    });
    tableCloth.forEach(function (product, index) {
        var average = [];
        for (var i = 0; i < 4; i++) {
            average.push(data[0 + 24 * index + i].sell_price_min * (averageEnchanted[i] / 100));
        }
        var productAverage = average.reduce(function (a, b) { return a + b; }, 0).toFixed(2);
        product.innerHTML = productAverage;
        weightedCostSummary[2].push(parseInt(productAverage));
    });
    tableLeather.forEach(function (product, index) {
        var average = [];
        for (var i = 0; i < 4; i++) {
            average.push(data[12 + 24 * index + i].sell_price_min * (averageEnchanted[i] / 100));
        }
        var productAverage = average.reduce(function (a, b) { return a + b; }, 0).toFixed(2);
        product.innerHTML = productAverage;
        weightedCostSummary[3].push(parseInt(productAverage));
    });
};
var calculateProfit = function (data) {
    var happiness = document.getElementById('happiness');
    var happinessValue = parseInt(happiness.value) / 100;
    var marketTax = document.getElementById('tax');
    var marketTaxValue = parseInt(marketTax.value) / 100;
    tableBlacksmith.forEach(function (product, index) {
        var sum = [];
        for (var j = 0; j < 4; j++) {
            sum.push((ResourceProportion[0][j] / 100) *
                (baseReturnYield[index] * happinessValue) *
                weightedCostSummary[j][index]);
        }
        var productProfit = sum.reduce(function (a, b) { return a + b; }, 0) + data[10 + 24 * index].sell_price_min;
        product.innerHTML = ((productProfit - data[11 + 24 * index].sell_price_min) *
            (1 - marketTaxValue)).toFixed(2);
        sum = [];
    });
    tableFletcher.forEach(function (product, index) {
        var sum = [];
        for (var j = 0; j < 4; j++) {
            sum.push((ResourceProportion[1][j] / 100) *
                (baseReturnYield[index] * happinessValue) *
                weightedCostSummary[j][index]);
        }
        var productProfit = sum.reduce(function (a, b) { return a + b; }, 0) + data[4 + 24 * index].sell_price_min;
        product.innerHTML = ((productProfit - data[5 + 24 * index].sell_price_min) *
            (1 - marketTaxValue)).toFixed(2);
        sum = [];
    });
    tableImbuer.forEach(function (product, index) {
        var sum = [];
        for (var j = 0; j < 4; j++) {
            sum.push((ResourceProportion[2][j] / 100) *
                (baseReturnYield[index] * happinessValue) *
                weightedCostSummary[j][index]);
        }
        var productProfit = sum.reduce(function (a, b) { return a + b; }, 0) + data[6 + 24 * index].sell_price_min;
        product.innerHTML = ((productProfit - data[7 + 24 * index].sell_price_min) *
            (1 - marketTaxValue)).toFixed(2);
        sum = [];
    });
    tableTinker.forEach(function (product, index) {
        var sum = [];
        for (var j = 0; j < 4; j++) {
            sum.push((ResourceProportion[3][j] / 100) *
                (baseReturnYield[index] * happinessValue) *
                weightedCostSummary[j][index]);
        }
        var productProfit = sum.reduce(function (a, b) { return a + b; }, 0) + data[8 + 24 * index].sell_price_min;
        product.innerHTML = ((productProfit - data[9 + 24 * index].sell_price_min) *
            (1 - marketTaxValue)).toFixed(2);
        sum = [];
    });
};
getData('caerleon'); // initial data
