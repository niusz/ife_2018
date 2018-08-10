
var storage = window.localStorage;
var data = {
    name: 'xx',
    sex: 'man',
    hobby: 'woman'
};
storage.setItem('data1', data);
var d = JSON.stringify(data);
storage.setItem('data2', d);
console.log(storage.data1);
console.log(storage.data2);
console.log(storage);