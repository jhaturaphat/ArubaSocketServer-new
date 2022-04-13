function base64ToHex(str) {
  const raw = atob(str);
  let result = '';
  let count = 1;
  let len = 1;
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
    console.log(result,count)
    if(count==1&&len!=6){
      result = result.concat(':')
      count=0;
    }
    count++;
    len++;

  }
  return result.toUpperCase();
}

console.log(base64ToHex("ODQ3MjA="));
