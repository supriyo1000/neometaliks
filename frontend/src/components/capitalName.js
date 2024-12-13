export function capitalName(name) {
    console.log(name);
    if (name !== '' && name !== null) {
        let nameArray = name.split(' ');
        let capitalizedArray = [];

        for (let i = 0; i < nameArray.length; i++) {
            capitalizedArray.push(nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1).toLowerCase());
        }

        let fullname = capitalizedArray.join(' ');
        return fullname;
    } else {
        return name;
    }
}

