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
    } else {
      console.log("🔐 Access denied.");
    }
  }
}

// create a lock with specific configuration
const simpleLock = new Lock("Mirash", 1234, { faceID: true, fingerPrint: 5 });

simpleLock.checkAccess(1234, { faceID: true });
simpleLock.checkAccess(1234, { fingerPrint: 5 });
simpleLock.checkAccess(1234, { faceID: false, fingerPrint: 5 });
simpleLock.checkAccess(1234);
simpleLock.checkAccess(0, { faceID: true, fingerPrint: 5 });
simpleLock.checkAccess(1234, { faceID: false, fingerPrint: 2 });
