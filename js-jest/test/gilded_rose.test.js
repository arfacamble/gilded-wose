const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  describe("Gross cheese", function() {
    it("should increase in quality", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(6);
    });
  
    it("should decrease in quality", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(7);
    });
  
    it("should not increase in quality beyond 50", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(50);
    });
  });

  describe("Backstage passes", function() {
    it("should increase in quality by 1 with more than 10 days left", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(11);
      expect(items[0].quality).toBe(6);
    });
  
    it("should increase in quality by 2 with more than 5 days left", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 8, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(7);
      expect(items[0].quality).toBe(7);
    });
  
    it("should increase in quality by 3 with fewer than 5 days left", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(2);
      expect(items[0].quality).toBe(8);
    });
  
    it("should have 0 quality after the show is over", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
    
    it("should not increase in quality beyond 50", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(50);
    });
  });

  describe("Standard Perishable Items Quality", function() {
    it("should go down by one before sell in", function() {
      const gildedRose = new Shop([new Item("apple", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(9);
    });
  
    it("should go down by two after sell in", function() {
      const gildedRose = new Shop([new Item("apple", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(8);
    });
  
    it("should not go negative", function() {
      const gildedRose = new Shop([new Item("apple", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
  
  describe("Sulfuras Quality", function() {
    it("should remain at 80 after sell by date", function() {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
    });
  
    it("should remains at 80 before sell by date", function() {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
    });
  });

  describe.skip("Conjured Products", function() {
    it("should degrade in quality twice as fast with sellIn positive", function() {
      const gildedRose = new Shop([new Item("Conjured item", 1, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(18);
    });
  
    it("should degrade in quality twice as fast with sellIn negative", function() {
      const gildedRose = new Shop([new Item("Conjured item", -1, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(16);
    });
  
    it("should not have quality less than zero", function() {
      const gildedRose = new Shop([new Item("Conjured item", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });
});