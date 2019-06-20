
// class TabLink {
//   constructor(element) {
//     // Assign this.element to the passed in DOM element
//     this.element = element;
    
//     // Get the custom data attribute on the Link
//     this.data = element.dataset.tab;
    
//     // Using the custom data attribute get the associated Item element
//     this.itemElement = document.querySelector(`.tabs-item[data-tab="${this.data}"]`);
    
//     // Using the Item element, create a new instance of the TabItem class
//     this.tabItem = new TabItem(this.itemElement);
    
//     // Add a click event listener on this instance, calling the select method on click
//     this.element.addEventListener('click', this.select.bind(this));

//   };

//   select() {
//     // Get all of the elements with the tabs-link class
//     const links = document.querySelectorAll('.tabs-link');

//     // Using a loop or the forEach method remove the 'tabs-link-selected' class from all of the links
//     Array.from(links).forEach(element => element.classList.remove('tabs-link-selected'));

//     // Add a class named "tabs-link-selected" to this link
//     this.element.classList.add('tabs-link-selected');
    
//     // Call the select method on the item associated with this link
//     this.tabItem.select();
//   }
// }

// class TabItem {
//   constructor(element) {
//     // Assign this.element to the passed in element
//     this.element = element;
//   }

//   select() {
//     // Select all ".tabs-item" elements from the DOM
//     const items = document.querySelectorAll('.tabs-item');

//     // Remove the class "tabs-item-selected" from each element
//     items.forEach(element => element.classList.remove('tabs-item-selected'));
    
//     // Add a class named "tabs-item-selected" to this element
//     this.element.classList.add('tabs-item-selected');
//   }
// }

// /* START HERE: 

// - Select all classes named ".tabs-link" and assign that value to the links variable

// - With your selection in place, now chain a .forEach() method onto the links variable to iterate over the DOM NodeList

// - In your .forEach() method's callback function, return a new instance of TabLink and pass in each link as a parameter

// */

// const links = document.querySelectorAll('.tabs-link');
// links.forEach(element => new TabLink(element));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Tabs {
  constructor(element) {
    this.element = element;

    this.tabLinks = {};
    const linkElements = element.querySelectorAll('.tabs-link');
    for (let i = 0; i < linkElements.length; i++) {
      this.tabLinks[linkElements[i].dataset.tab] = new TabLink(linkElements[i], this);
    }

    this.tabItems = {};
    const itemElements = element.querySelectorAll('.tabs-item');
    for (let i = 0; i < itemElements.length; i++) {
      this.tabItems[itemElements[i].dataset.tab] = new TabItem(itemElements[i]);
    }
  }

  choose(tabID) {
    Object.keys(this.tabLinks).forEach(key => this.tabLinks[key].deselect());
    this.tabLinks[tabID].select();
    Object.keys(this.tabItems).forEach(key => this.tabItems[key].deselect());
    this.tabItems[tabID].select();
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element;
    this.data = element.dataset.tab;
    
    this.element.addEventListener('click', () => parent.choose(this.data));
  };

  select() {
    this.element.classList.add('tabs-link-selected');
  }

  deselect() {
    this.element.classList.remove('tabs-link-selected');
  }
}

class TabItem {
  constructor(element) {
    this.element = element;
  }

  select() {
    this.element.classList.add('tabs-item-selected');
  }

  deselect() {
    this.element.classList.remove('tabs-item-selected');
  }
}

const tabSections = document.querySelectorAll('div.tabs');
tabSections.forEach(divElement => new Tabs(divElement));