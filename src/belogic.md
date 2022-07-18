// OLD LOGIC

// const onBulkEdit = (value, factor, dates, defaultValue) => {
// const factorData = tableData.filter((item) => item.factor === factor);
// let count = 0;
// const factorObj = {
// factor: factor,
// count
// }
// try {
// // setUpdatedFactorsListOnBulkEdit(value, factor, dates, defaultValue);
// const updatedFactorData = factorData[0].data.map((item, i) => {
// // const factorsList = updatedFactorsList.find((item) => item.factor === factor);
// if (dates.includes(item.date) && value === defaultValue) {
// let dataObject = {
// value: value,
// date: item.date,
// default: true,
// };
// count = count === 0 ? count : count - 1;
// return dataObject;
// } else if (dates.includes(item.date)) {
// let dataObject = {
// value,
// date: item.date,
// default: false,
// };
// count += 1;
// return dataObject;
// } else {
// return item;
// }
// });
// const factorsList = updatedFactorsList.find((item) => item.factor === factor);
// if(factorsList !== undefined && factorsList.count > 0) {
// let newFactor = {
// factor,
// count: factorsList?.count + count,
// }
// const removeOldFactor = updatedFactorsList.filter((item) => item.factor !== factor);
// setUpdatedFactorsList([...removeOldFactor, newFactor])
// } else {
// let newFactor2 = {
// factor,
// count: factorsList?.count + count,
// }
// const removeOldFactor = updatedFactorsList.filter((item) => item.factor !== factor);
// setUpdatedFactorsList([...removeOldFactor, newFactor2])
// }
// const updatedFactor = {
// factor,
// data: updatedFactorData,
// };
// const newTableData = tableData.map((item) => {
// if (item.factor === factor) {
// return updatedFactor;
// } else {
// return item;
// }
// });
// setTableData(newTableData);
// } catch (e) {
// console.log(e);
// }
// };

// NEW LOGIC

// const onBulkEdit = (value, factor, dates, defaultValue) => {
// const selectedFactor = tableData.filter((item) => item.factor === factor);
// try {
// let updatedFactor = [];
// let existingFactor =
// dates.forEach((date) => {
// selectedFactor[0].data.map(item => {
// if(item.date === date) {
// updatedFactor.push({
// date: item.date,
// value: value,
// default: value === defaultValue ? true : false
// })
// }
// })
// })
// const mergedUpdatedFactor = selectedFactor[0].data.map((item) => {
// const updatedFactorItem = updatedFactor.filter((data) => data.date === item.date);

// if(updatedFactorItem.length > 0) {
// return updatedFactorItem[0];
// } else {
// return item;
// }
// })
// console.log({ mergedUpdatedFactor })

// const updatedTableData = tableData.map((item) => {
// if(item.factor === factor) {
// return {factor: factor, data: mergedUpdatedFactor};
// } else {
// return item
// }
// })
// console.log({ updatedTableData });
// setTableData(updatedTableData);
// } catch (e) {
// console.log("Error in Bulk Edit Operation", e);
// }
// }
