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

      const qualityChange = this.getItemQualityChange(item);

      item.quality += qualityChange
      item.quality = restrictRange(item.quality, 0, 50);  

      item.sellIn -= 1;
    }

    return this.items;
  }

  getItemQualityChange(item) {
    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      return this.getQualityChangeForBackstagePasses(item);
    }
    
    let qualityChange = -1;
    
    if (item.sellIn <= 0) {
      qualityChange *= 2;
    }
    
    if (item.name === "Aged Brie") {
      qualityChange *= -1;
    }
    
    if (item.name === "Conjured item") {
      qualityChange *= 2;
    }

    return qualityChange;
  }
  
  getQualityChangeForBackstagePasses(item) {
    if (item.sellIn <= 0) {
      return -item.quality;       // add this to give 0 result
    }
    if (item.sellIn > 0 && item.sellIn <= 5) {
      return 3;
    }
    if (item.sellIn > 5 && item.sellIn <= 10) {
      return 2;
    }
    return 1;
  }
}

module.exports = {
  Item,
  Shop
}
