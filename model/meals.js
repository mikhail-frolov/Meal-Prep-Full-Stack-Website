const meals = {

    fakedb: [],

    initializeDB() {
        this.fakedb.push({

            title: "Fat Burner",
            category: "Fat burner Package",
            price: "149.99$",
            meals: 18,
            description: "Low carbs, nutrient-rich meals with fat-burning profiles to support fat loss",
            img: "fatb.jpg",
            top: true

        });

        this.fakedb.push({
            title: "Weight Loss",
            category: "Weight Loss Package",
            price: "145.99$",
            meals: 16,
            description: "High protein, low-calorie meals with a nutrient profile tuned for weight loss",
            img: "wl.jpg",
            top: true

        });

        this.fakedb.push({
            title: "Keto",
            category: "Keto Diet Package",
            price: "159.99$",
            meals: 16,
            description: "High fat, low carb meals with moderate protein to achieve and sustain ketosis",
            img: "keto.jpg",
            top: true

        });

        this.fakedb.push({
            title: "Muscle Gain",
            category: "Muscle Gain Package",
            price: "159.99$",
            meals: 16,
            description: "Higher protein and calorie portions to support your muscle gain momentum",
            img: "mg.jpg",
            top: true
        });

        this.fakedb.push({
            title: "Vegan",
            category: "Vegan Package",
            price: "159.99$",
            meals: 16,
            description: "A fully plant-based package featuring vegan meat and no animal products",
            img: "vegan.jpg",
            top: false
        });

        this.fakedb.push({
            title: "Veggie",
            category: "Veggie Package",
            price: "159.99$",
            meals: 16,
            description: "A vegetarian-friendly package with a natural and nutrient-rich approach",
            img: "veggie.jpg",
            top: false
        });

        this.fakedb.push({
            title: "Gluten Free",
            category: "Gluten Free Package",
            price: "117$",
            meals: 16,
            description: "A gluten-free package with the same balanced profile as our other packages",
            img: "gluten.jpg",
            top: false
        });

        this.fakedb.push({
            title: "Prebiotic Soup Cleanse",
            category: "Prebiotic Soup Cleanse Package",
            price: "129$",
            meals: 16,
            description: "A protein-packed meal and two superb prebiotic soups per day for up to 14 days",
            img: "prebiotic.jpg",
            top: false
        });
    },

    getAllMeals() {
        return this.fakedb;
    },


    getTopMeals() {

        topDB = [];

        for (let i = 0; i < this.fakedb.length; i++)
            if (this.fakedb[i].top == true)
                topDB.push(this.fakedb[i]);
        return topDB;
    }


}

meals.initializeDB();
module.exports = meals;