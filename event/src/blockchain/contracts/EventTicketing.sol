// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventTicketing {
    // Struct to represent a user
    struct User {
        string name;
        string mobileNumber;
        mapping(uint256 => TicketPurchase) ticketsPurchased;
        uint256 numTicketsPurchased;
    }

    // Struct to represent an event
    struct Event {
        string name;
        string date;
        string time;
        uint256 eventId;
    }

    // Struct to represent a ticket purchase
    struct TicketPurchase {
        string eventName;
        uint256 price;
        uint256 numOfPersons;
        uint256[] seatNumbers;
    }

    // Mapping to store users by their names
    mapping(string => User) public usersByName;

    // Mapping to store events by their names
    mapping(string => Event) public eventsByName;

    // Counter for the number of users registered
    uint256 public userCount;

    // Counter for the number of events created
    uint256 public eventCount;

    // Event to track ticket purchases
    event TicketPurchased(string indexed userName, string eventName, uint256 price, uint256 numOfPersons, uint256[] seatNumbers);
    event TicketDeleted(string indexed userName, string eventName, uint256 price, uint256 numOfPersons, uint256[] seatNumbers);
    event EtherReceived(uint indexed amount);

    // Function to register a new user
    function registerUser(string memory _name, string memory _mobileNumber) external {
        require(bytes(usersByName[_name].name).length == 0, "User already exists");

        User storage newUser = usersByName[_name];
        newUser.name = _name;
        newUser.mobileNumber = _mobileNumber;
        newUser.numTicketsPurchased = 0;

        userCount++;
    }
    // Function to purchase tickets for an event
    function purchaseTicket(string memory _userName, string memory _eventName, uint256 _price, uint256 _numOfPersons, uint256[] memory _seatNumbers) external payable {
        require(_price * _numOfPersons < msg.value, "Insufficient funds");

        Event storage evt = eventsByName[_eventName];
        require(bytes(evt.name).length != 0, "Event does not exist");

        User storage user = usersByName[_userName];
        user.ticketsPurchased[user.numTicketsPurchased] = TicketPurchase(_eventName, _price, _numOfPersons, _seatNumbers);
        user.numTicketsPurchased++;

        // Emit ticket purchase event
        emit TicketPurchased(_userName, _eventName, _price, _numOfPersons, _seatNumbers);
    }
    // Function to delete a ticket
    function deleteTicket(string memory _userName, string memory _eventName) external {
    User storage user = usersByName[_userName];
    require(bytes(user.name).length != 0, "User does not exist");

    uint256 ticketIndexToDelete = 0;
    bool ticketFound = false;

    // Search for the ticket with the specified event name
    for (uint256 i = 0; i < user.numTicketsPurchased; i++) {
        if (keccak256(abi.encodePacked(user.ticketsPurchased[i].eventName)) == keccak256(abi.encodePacked(_eventName))) {
            ticketIndexToDelete = i;
            ticketFound = true;
            break;
        }
    }

    // Ensure that the ticket was found
    require(ticketFound, "Ticket not found for the specified event");

    TicketPurchase storage ticketToDelete = user.ticketsPurchased[ticketIndexToDelete];

    // Refund the Ether for the deleted ticket
    payable(msg.sender).transfer(ticketToDelete.price * ticketToDelete.numOfPersons);

    // Delete the ticket
    delete user.ticketsPurchased[ticketIndexToDelete];
    emit TicketDeleted(_userName, ticketToDelete.eventName, ticketToDelete.price, ticketToDelete.numOfPersons, ticketToDelete.seatNumbers);
}

    // Function to get user details
    function getUserDetails(string memory _name) external view returns (string memory, string memory) {
        User storage user = usersByName[_name];
        return (user.name, user.mobileNumber);
    }
    // Function to get tickets purchased by a user
    function getTicketsPurchasedByUser(string memory _name) external view returns (TicketPurchase[] memory) {
        User storage user = usersByName[_name];
        TicketPurchase[] memory purchases = new TicketPurchase[](user.numTicketsPurchased);
        for (uint256 i = 0; i < user.numTicketsPurchased; i++) {
            purchases[i] = user.ticketsPurchased[i];
        }
        return purchases;
    }
    // Function to add a new event
    function addEvent(string memory _name, string memory _date, string memory _time) external {
        require(bytes(_name).length > 0, "Event name must not be empty");

        eventCount++;
        eventsByName[_name] = Event(_name, _date, _time, eventCount);
    }
    // Function to get event details
    function getEventDetails(string memory _name) external view returns (string memory, string memory, string memory, uint256) {
        Event memory evt = eventsByName[_name];
        return (evt.name, evt.date, evt.time, evt.eventId);
    }
    // Function to get the list of all events and their details
    function getAllEvents(string memory _name) external view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](eventCount);
        for (uint256 i = 1; i <= eventCount; i++) {
            Event storage evt = eventsByName[_name];
            allEvents[i - 1] = evt;
        }
        return allEvents;
    }
    // Fallback function
    fallback() external payable {
        // Handle received Ether
        // You can add custom logic here
        emit EtherReceived(msg.value);
    }
    // Receive function
    receive() external payable {
        // Handle received Ether
        // You can add custom logic here
        emit EtherReceived(msg.value);
    }
}
