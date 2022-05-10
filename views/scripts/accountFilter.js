console.log(document.getElementById('allAccounts'))

const filterByType = (type) => {
    console.log(JSON.parse(allUsers))
    switch (type) {
        case 'student': 
            tempUsers = allUsers.filter((user) => user.accountType === 'student');
            break;
        case 'teacher': 
            tempUsers = allUsers.filter((user) => user.accountType === 'teacher');
            break;
        case 'admin': 
            tempUsers = allUsers.filter((user) => user.accountType === 'admin');
            break;
        default:
            tempUsers = allUsers;
    }
}