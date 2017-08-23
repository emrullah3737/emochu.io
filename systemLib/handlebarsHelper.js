const HandleBars = require('hbs');
const _ = require('underscore');

HandleBars.registerHelper('values', (data) => {
  let str = '';
  data.forEach((obj) => {
    let str2 = '';
    const newObj = JSON.parse(JSON.stringify(obj));
    _.each(newObj, (el, key) => {
      if (key === '_id') {
        str2 += `<td><a href="${data.el}/${el}">${el}</a></td>`;
      } else if (key !== '__v' && key !== 'password') {
        str2 += `<td>${el}</td>`;
      }
    });
    str2 += `<td>
    <form method="post" action="remove${data.el}">
      <input style="visibility: hidden;width: 1px" name="_id" value="${newObj._id}">
      <button class="btn btn-danger btn-circle btn-sm" type="submit" title="Remove the record"><i class="fa fa-trash"></i>
      </button>
    </form>
  </td>`;
    str += `<tr>${str2}</tr>`;
  });
  return str;
});

HandleBars.registerHelper('fields', (data) => {
  let str = '';
  if (data.length > 0) {
    const newObj = JSON.parse(JSON.stringify(data[0]));
    _.each(newObj, (el, key) => {
      if (key !== '__v' && key !== 'password') {
        str += `<th>${key}</th>`;
      }
    });
  }
  return str;
});

HandleBars.registerHelper('radar', data => data);

HandleBars.registerHelper('if_eq', (a, b, opts) => {
  if (a === b) return opts.fn(this);
  return opts.inverse(this);
});

HandleBars.registerHelper('record', (data) => {
  let str = '';
  const newObj = JSON.parse(JSON.stringify(data));
  _.each(newObj, (el, key) => {
    if (el.enums !== undefined) {
      str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
      <select class="form-control s-b" name="${el.field}">`;
      _.each(el.enums, (enumval, enumkey) => {
        str += `<option value="${enumval}">${enumval}</option>`;
      });
      str += '</select></div></div><div class="col-md-12"><hr></div>';
    } else if (el.ref !== undefined) {
      str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
      <select class="form-control s-b" name="${el.field}">`;
      _.each(el.ref.response, (mdlval, mdlkey) => {
        str += `<option value="${mdlval._id}">${mdlval._slug}</option>`;
      });
      str += '</select></div></div><div class="col-md-12"><hr></div>';
    } else {
      let inputType = 'text';
      if (el.field === 'password') inputType = 'password';
      if (el.field === 'mail' || el.field === 'email') inputType = 'email';
      switch (el.type) {
        case 'ObjectID': // ObjectID
          str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
        <input type="${inputType}" placeholder="Enter ${el.field}" name="${el.field}" class="form-control"></div>
    </div><div class="col-md-12"><hr></div>`;
          break;
        case 'String': // String
          str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
        <input type="${inputType}" placeholder="Enter ${el.field}" name="${el.field}" class="form-control"></div>
    </div><div class="col-md-12"><hr></div>`;
          break;
        case 'Date': // Date
          str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
        <input type="date" placeholder="Enter ${el.field}" name="${el.field}" class="form-control"></div>
    </div><div class="col-md-12"><hr></div>`;
          break;
        case 'Number': // Number
          str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
        <input type="number" placeholder="Enter ${el.field}" name="${el.field}" class="form-control"></div>
    </div><div class="col-md-12"><hr></div>`;
          break;
        default:
          // Default
          str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
        <input type="text" placeholder="Enter ${el.field}" name="${el.field}" class="form-control"></div>
    </div><div class="col-md-12"><hr></div>`;
          break;
      }
    }
  });
  str +=
    '<div class="col-md-12"><button class="btn  btn-outline btn-primary" type="submit">Add Record</button></div>';
  return str;
});

HandleBars.registerHelper('updateRecord', (data) => {
  let str = '';
  const newData = JSON.parse(JSON.stringify(data));
  const newObj = newData.fieldObj;
  const newValue = newData.valueObj;
  _.each(newObj, (el, key) => {
    const value = newValue[el.field];
    if (el.enums !== undefined) {
      str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
      <select class="form-control s-b" name="${el.field}">`;
      _.each(el.enums, (enumval, enumkey) => {
        str += `<option value="${enumval}">${enumval}</option>`;
      });
      str += '</select></div></div><div class="col-md-12"><hr></div>';
    } else if (el.ref !== undefined) {
      str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
      <select class="form-control s-b" name="${el.field}">`;
      _.each(el.ref.response, (mdlval, mdlkey) => {
        const boo = value === mdlval._id ? 'selected' : '';
        str += `<option ${boo} value="${mdlval._id}">${mdlval._slug}</option>`;
      });
      str += '</select></div></div><div class="col-md-12"><hr></div>';
    } else {
      let inputType = 'text';
      if (el.field === 'password') inputType = 'password';
      if (el.field === 'mail' || el.field === 'email') inputType = 'email';
      switch (el.type) {
        case 'ObjectID':
          str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
        <input value="${value}" type="${inputType}" placeholder="Enter ${el.field}" name="${el.field}" class="form-control"></div>
    </div><div class="col-md-12"><hr></div>`;
          break;
        case 'String':
          str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
        <input value="${value}" type="${inputType}" placeholder="Enter ${el.field}" name="${el.field}" class="form-control"></div>
    </div><div class="col-md-12"><hr></div>`;
          break;
        case 'Date':
          str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
        <input value="${value}" type="date" placeholder="Enter ${el.field}" name="${el.field}" class="form-control"></div>
    </div><div class="col-md-12"><hr></div>`;
          break;
        case 'Number':
          str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
        <input value="${value}" type="number" placeholder="Enter ${el.field}" name="${el.field}" class="form-control"></div>
    </div><div class="col-md-12"><hr></div>`;
          break;
        default:
          str += `<div class="col-md-3">${el.field}</div><div class="col-md-9">
      <div class="form-group"><label for="${el.field}" class="sr-only">${el.field}</label>
        <input type="text" placeholder="Enter ${el.field}" name="${el.field}" class="form-control"></div>
    </div><div class="col-md-12"><hr></div>`;
          break;
      }
    }
  });
  str += `<input style="visibility: hidden;width: 1px" name="_id" value="${newValue._id}">
    <div class="col-md-12"><button class="btn  btn-outline btn-primary" type="submit">Update Record</button></div>`;
  return str;
});

module.exports = () => {
  console.log('* HandleBars Helper *');
  return HandleBars;
};
