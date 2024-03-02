// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventTicketing {
    struct User {
        string name;
        string mobileNumber;
        mapping(uint256 => TicketPurchase) ticketsPurchased;
        uint256 numTicketsPurchased;
        string imgHash;
    }

    struct Event {
        string name;
        string date;
        string time;
        uint256 eventId;
    }

    struct TicketPurchase {
        string eventName;
        uint256 price;
        uint256 numOfPersons;
        uint256[] seatNumbers;
    }

    mapping(string => User) public usersByName;

    mapping(string => Event) public eventsByName;

    uint256 public userCount;

    uint256 public eventCount;

    event TicketPurchased(string indexed userName, string eventName, uint256 price, uint256 numOfPersons, uint256[] seatNumbers);
    event TicketDeleted(string indexed userName, string eventName, uint256 price, uint256 numOfPersons, uint256[] seatNumbers);
    event EtherReceived(uint indexed amount);

    function registerUser(string memory _name, string memory _mobileNumber,string memory _imgHash) external {
        require(bytes(usersByName[_name].name).length == 0, "User already exists");

        User storage newUser = usersByName[_name];
        newUser.name = _name;
        newUser.mobileNumber = _mobileNumber;
        newUser.imgHash=_imgHash;
        newUser.numTicketsPurchased = 0;
        userCount++;
    }

    function purchaseTicket(string memory _userName, string memory _eventName, uint256 _price, uint256 _numOfPersons, uint256[] memory _seatNumbers) external payable {
        require(_price * _numOfPersons < msg.value, "Insufficient funds");

        Event storage evt = eventsByName[_eventName];
        require(bytes(evt.name).length != 0, "Event does not exist");

        User storage user = usersByName[_userName];
        user.ticketsPurchased[user.numTicketsPurchased] = TicketPurchase(_eventName, _price, _numOfPersons, _seatNumbers);
        user.numTicketsPurchased++;

        emit TicketPurchased(_userName, _eventName, _price, _numOfPersons, _seatNumbers);
    }

    function deleteTicket(string memory _userName, string memory _eventName) external {
    User storage user = usersByName[_userName];
    require(bytes(user.name).length != 0, "User does not exist");

    uint256 ticketIndexToDelete = 0;
    bool ticketFound = false;

    for (uint256 i = 0; i < user.numTicketsPurchased; i++) {
        if (keccak256(abi.encodePacked(user.ticketsPurchased[i].eventName)) == keccak256(abi.encodePacked(_eventName))) {
            ticketIndexToDelete = i;
            ticketFound = true;
            break;
        }
    }

    require(ticketFound, "Ticket not found for the specified event");

    TicketPurchase storage ticketToDelete = user.ticketsPurchased[ticketIndexToDelete];

    payable(msg.sender).transfer(ticketToDelete.price * ticketToDelete.numOfPersons);

    delete user.ticketsPurchased[ticketIndexToDelete];
    emit TicketDeleted(_userName, ticketToDelete.eventName, ticketToDelete.price, ticketToDelete.numOfPersons, ticketToDelete.seatNumbers);
}

    function getUserDetails(string memory _name) external view returns (string memory, string memory,string memory) {
        User storage user = usersByName[_name];
        return (user.name, user.mobileNumber, user.imgHash);
    }

    function getTicketsPurchasedByUser(string memory _name) external view returns (TicketPurchase[] memory) {
        User storage user = usersByName[_name];
        TicketPurchase[] memory purchases = new TicketPurchase[](user.numTicketsPurchased);
        for (uint256 i = 0; i < user.numTicketsPurchased; i++) {
            purchases[i] = user.ticketsPurchased[i];
        }
        return purchases;
    }

    function addEvent(string memory _name, string memory _date, string memory _time) external {
        require(bytes(_name).length > 0, "Event name must not be empty");

        eventCount++;
        eventsByName[_name] = Event(_name, _date, _time, eventCount);
    }

    function getEventDetails(string memory _name) external view returns (string memory, string memory, string memory, uint256) {
        Event memory evt = eventsByName[_name];
        return (evt.name, evt.date, evt.time, evt.eventId);
    }

    function getAllEvents(string memory _name) external view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](eventCount);
        for (uint256 i = 1; i <= eventCount; i++) {
            Event storage evt = eventsByName[_name];
            allEvents[i - 1] = evt;
        }
        return allEvents;
    }

    fallback() external payable {
        // Handle received Ether
        // You can add custom logic here
        emit EtherReceived(msg.value);
    }

    receive() external payable {
        // Handle received Ether
        // You can add custom logic here
        emit EtherReceived(msg.value);
    }
}
