import {addUserDataToDom, removeUserDataFromDom} from "../dom.js";
import { logUserOut } from "../logout.js";

window.onload = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user, token);

  if (token) {
    addUserDataToDom(user);
    logUserOut();
    const userButton = document.getElementById('user-account');
    if (user.user_level_id === 1) {
      userButton.href = '/my-account/admin';
    }
  } else {
    removeUserDataFromDom();
  }
};

const contentTabs = document.getElementById('content-tabs');
contentTabs.addEventListener('click', (evt) => {
  const clickedTab = evt.target.closest('.content-tab');
  if (clickedTab && clickedTab.classList.contains('content-tab')) {
    const expanded = clickedTab.classList.contains('expanded');
    const tabs = contentTabs.querySelectorAll('.content-tab');
    tabs.forEach(tab => {
      tab.classList.remove('expanded');
    });
    const info = contentTabs.querySelectorAll('.text');
    info.forEach(text => {
      text.classList.remove('active')
    });
    if (!expanded) {
      clickedTab.classList.add('expanded');
      const clickedIinfo = clickedTab.querySelectorAll('.text');
      clickedIinfo.forEach(text => {
        text.classList.add('active')
      })
    }
  }
});

