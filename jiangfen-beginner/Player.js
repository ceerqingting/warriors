class Player {
  constructor() {
    this.health = 20;
    this.backStep = 0;
  }
  isEmpty(warrior, dir = 'forward') {
    return warrior.feel(dir).isEmpty()
  }
  isNeedRest(warrior) {
    let health = warrior.health()
    return this.health <= health && health < 20
  }
  isInjured (warrior) {
    return this.health > warrior.health()
  }
  isCaptive (warrior, dir = 'forward') {
    return warrior.feel(dir).getUnit().isBound()
  }
  isEnemy (warrior, dir = 'forward') {
    return warrior.feel(dir).getUnit().isEnemy()
  }
  isEmpty (warrior, dir = 'forward') {
    return warrior.feel(dir).isEmpty()
  }
  isNeedBack (warrior) {
    return warrior.health() < 3 && this.isInjured(warrior) || this.isEmpty(warrior)&&warrior.health() < 6&&this.isInjured(warrior)
  }
  isWall (warrior, dir = 'forward') {
    return warrior.feel(dir).isWall()
  }
  isNeedShoot(warrior) {
    warrior.think(warrior.feel().getUnit(warrior.look()[0]))
    return warrior.look().length > 1
  }
  isEnemyInSight(warrior, dir = 'forward') {
    const spaceWithUnit = warrior.look(dir).find(space => space.isUnit())
    return spaceWithUnit && spaceWithUnit.getUnit().isEnemy()
  }
  playTurn(warrior) {
    // Cool code goes here.
    let health = warrior.health()
    if (this.isWall(warrior)) {
      warrior.pivot()
      return
    }
    if (this.isEmpty(warrior)) {
       if (this.isNeedRest(warrior)) {
          warrior.rest()
       } else {
         if(this.isNeedBack(warrior)) {
           warrior.walk('backward')
           this.backStep++
         } else if (this.isEnemyInSight(warrior)){
           warrior.shoot()
         } else {
           warrior.walk()
         }
       } 
    } else {
      if (this.isCaptive(warrior)) {
        warrior.rescue()
      } else {
        if (this.isNeedBack(warrior)) {
          warrior.walk('backward')
          this.backStep++
        } else {
            warrior.attack()
        }
      }
    }
    this.health = health
  }
}



