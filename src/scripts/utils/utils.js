function getUUID() {
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return id;
}
function getValueOption() {
  const select = document.querySelector("#users");
  const value = select.options[select.selectedIndex].text;
  return value;
}
export { getUUID, getValueOption };
