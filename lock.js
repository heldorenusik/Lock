// Lock class
class Lock {
  // constructor with params; paramFaceId, paramFinterPrint are false by default if not passed
  constructor(userName, pin, paramFaceId = false, paramFinterPrint = false) {
    this.userName = userName;
    this.pin = pin;
    this.security = new Lock.Security(paramFaceId, paramFinterPrint);
  }
  // nested class security
  static Security = class {
    constructor(faceID, fingerPrint) {
      this.faceID = faceID;
      this.fingerPrint = fingerPrint;
    }

    // checks security values
    checkSecurityAccess(faceID, fingerPrint) {
      return faceID === this.faceID && fingerPrint === this.fingerPrint;
    }
  };

  // check access to Lock with pin and security params
  checkAccess(pin, faceID = false, fingerPrint = false) {
    // check pin and call security method to check its params. If all match -> grant access
    if (pin === this.pin && this.security.checkSecurityAccess(faceID, fingerPrint)) {
      console.log("🔓 Access granted.");
    } else {
      console.log("🔐 Access denied.");
    }
  }
}

// Smart lock class that calculates failed counts and blocks
class SmartLock extends Lock {
  failCount = 0;
  checkAccess(pin, faceID = false, fingerPrint = false) {
    if (this.failCount >= 3) {
      console.log("Blocked");
    } else {
      // check pin and call security method to check its params. If all match -> grant access
      if (pin === this.pin && this.security.checkSecurityAccess(faceID, fingerPrint)) {
        console.log("🔓 Access granted.");
      } else {
        this.failCount++;
        console.log("🔐 Access denied.");
      }
    }
  }
}

// try lock
console.log("=== Lock ===");
let lock = new Lock("Olenka", 1234, true, true);
console.log(lock);
lock.checkAccess(1234);
lock.checkAccess(1234, true, true);
lock.checkAccess(1234, false, false);
lock.checkAccess(2222, true, true);
lock.checkAccess(4534, true, true);
// try smart lock
console.log("\n=== Smart Lock ===");
let smartLock = new SmartLock("Froggy", 555);
console.log(smartLock);
smartLock.checkAccess(555);
smartLock.checkAccess(0);
smartLock.checkAccess(0);
smartLock.checkAccess(0);
smartLock.checkAccess(555);
smartLock.checkAccess(789);
