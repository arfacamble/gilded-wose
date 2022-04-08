const restrictRange = (num, min, max) => Math.min(Math.max(num, min), max);

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
    let qualityChange = -1;

    if (item.sellIn <= 0) {
      qualityChange *= 2;
    }

    if (item.name === "Aged Brie") {
      qualityChange *= -1;
    }

    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      qualityChange = 1;
      if (item.sellIn <= 0) {
        qualityChange = -item.quality;
      }
      else if (item.sellIn <= 5) {
        qualityChange = 3;
      }
      else if (item.sellIn <= 10) {
        qualityChange = 2;
      }
    }

    item.quality += qualityChange
    item.quality = restrictRange(item.quality, 0, 50);
  }

}

module.exports = {
  Item,
  Shop
}
