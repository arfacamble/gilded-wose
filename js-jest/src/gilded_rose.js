class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateShopItems() {

    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.name === 'Sulfuras, Hand of Ragnaros')
      {
        continue;
      }

      this.updateItemQuality(item);

      item.sellIn = item.sellIn - 1;
    }

    return this.items;
  }

  updateItemQuality(item) {
    if (item.name !== 'Aged Brie' && item.name !== 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        item.quality = item.quality - 1;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }

    if (item.sellIn <= 0) {
      if (item.name !== 'Aged Brie') {
        if (item.name !== 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            item.quality = item.quality - 1;
          }
        } else {
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  }

}

module.exports = {
  Item,
  Shop
}
