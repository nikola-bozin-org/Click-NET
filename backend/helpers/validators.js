const isValidIP = (ipAddress)=> {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ipAddress);
}

const isValidMAC = (macAddress)=> {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(macAddress);
}

const checkLocalHostIP = (ip)=>{
    if(ip==='::1') return '192.168.0.10';
    return ip;
}


module.exports={
    isValidIP,
    isValidMAC,
    checkLocalHostIP,
}