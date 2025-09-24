// define Lock class
class Lock {
  // define constructor
  constructor(userName, pin, securityConfig) {
    this.userName = userName;
    this.pin = pin;
    this.security = new Lock.Security(securityConfig);
  }

  // nested class to describe additional security configuration
  static Security = class {
    constructor({ faceID = false, fingerPrint = 0 }) {
      this.faceID = faceID;
      this.fingerPrint = fingerPrint;
    }

    // compares two Security instances. Requires all options to match
    matchesStrong(other) {
      return this.faceID === other.faceID && this.fingerPrint === other.fingerPrint;
    }

    // compares two Security instances. Requires at least one option to match
    matchesAny(other) {
      return this.faceID === other.faceID || this.fingerPrint === other.fingerPrint;
    }
  };

  // check access to the lock
  checkAccess(inputPin, inputSecurityOptions = {}) {
    const inputSecurity = new Lock.Security(inputSecurityOptions);
    if (inputPin === this.pin && this.security.matchesAny(inputSecurity)) {
      console.log("🔓 Access granted.");
      return true;
    } else {
      console.log("🔐 Access denied.");
      return false;
    }
  }
}

// advanced lock that extends Lock providing additional functionality (inheritance)
class SmartLock extends Lock {
  #accessAttemptCount = 0;
  #maxAttemptsCount;
  constructor(userName, pin, securityConfig, maxAttemptsCount = 3) {
    super(userName, pin, securityConfig); // call parent constructor
    this.#maxAttemptsCount = maxAttemptsCount;
  }

  checkAccess(inputPin, inputSecurityOptions = {}) {
    if (this.#accessAttemptCount >= this.#maxAttemptsCount) {
      console.log("🔐 Lock is blocked (forever?).");
      return false;
    }
    const isAccessGranted = super.checkAccess(inputPin, inputSecurityOptions);
    if (isAccessGranted) {
      this.#accessAttemptCount = 0;
    } else {
      this.#accessAttemptCount++;
    }
    return isAccessGranted;
  }
}

// create a lock with specific configuration
const lock = new Lock("Mirash", 1234, { faceID: true, fingerPrint: 5 });
// run experiments
console.log("=== Lock ===");
lock.checkAccess(1234, { faceID: true });
lock.checkAccess(1234, { fingerPrint: 5 });
lock.checkAccess(1234, { faceID: false, fingerPrint: 5 });
lock.checkAccess(1234);
lock.checkAccess(0, { faceID: true, fingerPrint: 5 });
lock.checkAccess(1234, { faceID: false, fingerPrint: 2 });
console.log("\n=== SmartLock ===");
// create an advanced lock with the same configuration
const smnartLock = new SmartLock("Mirash", 1234, { faceID: true, fingerPrint: 5 });
// run experiments
smnartLock.checkAccess(1234, { faceID: true });
smnartLock.checkAccess(1234);
smnartLock.checkAccess(0, { faceID: true, fingerPrint: 5 });
smnartLock.checkAccess(1234, { faceID: false, fingerPrint: 2 });
smnartLock.checkAccess(1234, { fingerPrint: 5 });
smnartLock.checkAccess(1234, { faceID: true });
smnartLock.checkAccess(1984);
smnartLock.checkAccess(1234, { faceID: true, fingerPrint: 5 });
