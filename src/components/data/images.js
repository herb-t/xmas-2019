const atsLoadImages = (a, d, z) => {
  a instanceof Array || (a = [a]);
  for (var e = a.length, f = 0, g = e; g--;) {
    let b = document.createElement('img');
    b.onload = () => {
      f++;
      f >= e && isFunction(d) && d(z)
    };
    b.src = a[g];
  }
}

let isFunction = (functionToCheck) => {
  let getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export {atsLoadImages}
