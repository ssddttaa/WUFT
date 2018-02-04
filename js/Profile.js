function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

var idToNameMap = {
  "93241094967535": "Liam Dugan",
  "27319059775796": "Gianluca Gross",
  "62956086387288": "Sadat Shaik"
}

var nameToIdMap = {
  "Liam Dugan" : "93241094967535",
  "Gianluca Gross" : "27319059775796",
  "Sadat Shaik" : "62956086387288"
}

var Profile = function () {
};

// This is the function where we are going to put all of the data into the data
Profile.prototype.updateData = function (data) {
  var profile = this;
  var customerAcctCreateDate = new Date(data.accountOpeningDate);

  this.name = idToNameMap[data.accountNumber];
  this.accountNumber = data.accountNumber;
  this.date = customerAcctCreateDate;
  this.numYears = timeSince(customerAcctCreateDate);
  this.status = data.status;
  this.interestRate = data.accountType.interestRate;
  this.annualPercentageRate = data.accountType.annualPercentageRate;
  this.accountType = data.accountType.accountType;
  this.creditLimit = data.accountType.creditLimit;
  this.balance = data.balance;
  this.isJointAccount = data.isJointAccount;
  this.bankName = data.businessUnit.bank.bankName;
  this.routingNumber = data.businessUnit.bank.routingNumber;
  this.address = data.businessUnit.address;
}

Profile.prototype.updateTransactions = function (data) {
  this.transactions = data["content"].sort(function (a,b) {
    if (a.transactionDate > b.transactionDate) {
      return -1;
    } else if (a.transactionDate < b.transactionDate) {
      return 1;
    } else {
      return 0;
    }
  });
}

Profile.prototype.displayData = function () {
  var transactions = this.transactions;
  var name = this.name.split(" ");
  var isJointAccountText = "";
  if (this.isJointAccount == "N") {
    isJointAccountText = "Not a Joint Account";
  } else if (this.isJointAccount == "Y") {
    isJointAccountText = "Joint Account";
  }

  var transactionDate1 = new Date(this.transactions[0].transactionDate);
  var transactionDate2 = new Date(this.transactions[1].transactionDate);
  var transactionDate3 = new Date(this.transactions[2].transactionDate);
  var transactionDate4 = new Date(this.transactions[3].transactionDate);
  var transactionDate5 = new Date(this.transactions[4].transactionDate);

  $('#last-name').text(name[1]);
  $('#first-name').text(name[0]);
  $('#address').text("Business Address: " + this.address);
  $('#account-number').text(this.accountNumber);
  $('#account-created').text(this.numYears);
  $('#account-type').text(this.accountType);
  $('#account-isJoint').text(isJointAccountText);
  $('#account-status').text(this.status);
  $('#account-balance').text(this.balance);

  $('#transaction-title-1').text(this.transactions[0].transactionType.accountType + " ~ " + this.transactions[0].transactionType.description);
  $('#transaction-date-1').text(transactionDate1);
  $('#transaction-amount-1').text("$" + this.transactions[0].amount);

  $('#transaction-title-2').text(this.transactions[1].transactionType.accountType + " ~ " + this.transactions[1].transactionType.description);
  $('#transaction-date-2').text(transactionDate2);
  $('#transaction-amount-2').text("$" + this.transactions[1].amount);

  $('#transaction-title-3').text(this.transactions[2].transactionType.accountType + " ~ " + this.transactions[2].transactionType.description);
  $('#transaction-date-3').text(transactionDate3);
  $('#transaction-amount-3').text("$" + this.transactions[2].amount);

  $('#transaction-title-4').text(this.transactions[3].transactionType.accountType + " ~ " + this.transactions[3].transactionType.description);
  $('#transaction-date-4').text(transactionDate4);
  $('#transaction-amount-4').text("$" + this.transactions[3].amount);

  $('#transaction-title-5').text(this.transactions[4].transactionType.accountType + " ~ " + this.transactions[4].transactionType.description);
  $('#transaction-date-5').text(transactionDate5);
  $('#transaction-amount-5').text("$" + this.transactions[4].amount);
}
