const renderToDom = (divID, htmlToRender) => {
  const selectedDiv = document.querySelector(divID);
  selectedDiv.innerHTML = htmlToRender;
};

export default renderToDom;
