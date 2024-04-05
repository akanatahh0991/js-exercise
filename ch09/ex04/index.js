
/**
 * 戦士クラス
 */
export class CSoldier {

    /**
     * コンストラクタ
     * @param {number} atk 
     */
    constructor(atk) {
        this.atk = atk;
    } 

    attack() {
        return this.atk * 2;
    }
}

/**
 * 魔法戦士クラス
 */
export class CMagicSoldier extends CSoldier {

    /**
     * コンストラクタ
     * @param {number} atk 
     * @param {number} mgc 
     */
    constructor(atk, mgc) {
        super(atk);
        this.mgc = mgc;
    }

    attack() {
        return super.attack() + this.mgc;
    }
}

/**
 * 戦士のコンストラクタ関数
 * @param {number} atk 
 */
export function FSoldier(atk) {
    this.atk = atk;
}

FSoldier.prototype.attack = function() {
    return this.atk * 2;
}

/**
 * 魔法戦士のコンストラクタ関数
 * @param {number} atk 
 * @param {number} mgc 
 */
export function FMagicSoldier(atk, mgc) {
    this.atk = atk;
    this.mgc = mgc;
}

FMagicSoldier.prototype = Object.create(FSoldier.prototype);
FMagicSoldier.prototype.constructor = FMagicSoldier;

FMagicSoldier.prototype.attack = function(){
    return FSoldier.prototype.attack.call(this) + this.mgc;
}





