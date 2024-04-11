//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract EmailEon {
  constructor() {}

  string[] emails;

  function getEmails() public view returns (string[] memory){
    return emails;
  }

  function addEmail(string memory _storeId) public {
    emails.push(_storeId);
  }
}
