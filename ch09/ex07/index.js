class AnimalSoundCommon {
    makeSound() {
        // 共通処理
    }
}

class Animal {
    eat() {}
}

class Dog extends Animal {
    constructor() {
        super();
        this._animalSoundCommon = new AnimalSoundCommon();
    }
    bite() {}
    makeSound() {
        this._animalSoundCommon.makeSound();
    }
}

class Husky extends Dog {}

class Cat extends Animal {
    constructor() {
        super();
        this._animalSoundCommon = new AnimalSoundCommon();
    }
    scratch() {}
    makeSound() {
        this._animalSoundCommon.makeSound();
    }
}

class Bird extends Animal {
    constructor() {
        super();
        this._animalSoundCommon = new AnimalSoundCommon();
    }
    fly() {}
    makeSound() {
        this._animalSoundCommon.makeSound();
    }
}

class Fish extends Animal {
    swim() {}
}
