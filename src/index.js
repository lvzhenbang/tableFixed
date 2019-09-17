import PerfectScrollbar from 'perfect-scrollbar';

import defaults from '../config/defaults';
import version from '../config/version';

import inBrowser from './utils/inBrowser';

class TableFixed {
  constructor(el, opt) {
    this.$el = el;
    this.options = {
      ...defaults,
      ...opt,
    };
    this.init();
    this.version = version;
  }

  init() {
    if (!this.$el) {
      throw new Error('this.$el must be exsits.');
    } else {
      this.tableContainer = this.$el.querySelector('.table-container');
    }

    if (!this.tableContainer) {
      throw new Error(`<div class="#eample">
          <div class="table-container">
            <table>...</table>
          </div>
        </div>
      `);
    } else {
      this.tableHead = this.tableContainer.querySelector('thead');
      this.tableHeadCopy = this.tableHead.cloneNode(true);
    }

    this.genFixedTableContainer();
    this.setTableHeadStyle();
    this.setScrollbar();
    this.scroll();
  }

  genFixedTableContainer() {
    const fixedtableContainer = document.createElement('div');

    fixedtableContainer.style.overflow = 'hidden';
    if (this.options.marginBottom) {
      fixedtableContainer.style.marginBottom = `${this.options.marginBottom}px`;
    }
    fixedtableContainer.classList.add('table-fixed');

    this.fixedtable = document.createElement('table');

    this.fixedtable.appendChild(this.tableHeadCopy);
    fixedtableContainer.appendChild(this.fixedtable);
    this.$el.insertBefore(fixedtableContainer, this.tableContainer);
  }

  setTableHeadStyle() {
    const tableHeadThs = this.tableHead.querySelectorAll('th');
    const fixedHeadThs = this.tableHeadCopy.querySelectorAll('th');
    tableHeadThs.forEach((item, i) => {
      fixedHeadThs[i].width = item.offsetWidth;
      fixedHeadThs[i].height = item.offsetHeight;

      item.setAttribute('style', 'width: 0px; height: 0px; padding: 0px; font-size: 0px; border-width: 0;');
    });
  }

  scroll() {
    this.tableContainer.addEventListener('scroll', (e) => {
      this.fixedtable.style.transform = `translateX(-${e.target.scrollLeft}px)`;
    });
  }

  setScrollbar() {
    let scrollbar = null;
    if (this.options.scrollbar) {
      this.tableContainer.style.overflow = 'hidden';
      this.tableContainer.style.position = 'relative';
      scrollbar = new PerfectScrollbar(this.tableContainer, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20,
      });
    }
    return scrollbar;
  }
}

if (inBrowser) {
  window.TableFixed = TableFixed;
  window.console.log('plugin is running browser.');
}

export default TableFixed;
