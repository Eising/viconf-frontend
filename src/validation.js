import { extend } from 'vee-validate'
import { required, numeric } from 'vee-validate/dist/rules'


const ipaddr = require('ipaddr.js');

/*
extend("date", {
  validate: value =>
    /^(19|20)\d\d[/]([1-9]|0[1-9]|1[012])[/]([1-9]|0[1-9]|[12][0-9]|3[01])$/.test(
      value
    ),
  message: "Date must be in YYYY/MM/DD format"
})
*/

function ValidationSetup() {
    extend("digits", numeric)
    extend("required", required)

    extend("string", {
        validate: value =>
            /^\S+$/.test(
                value
            ),
        message: "Must be a string without whitespace"
    })

    extend("asn", value => {
        if (value >= 1 && value <= 4294967296) {
            return true
        }
        return "AS Number must be between 1 and 4294967296"
    })

    extend("cidrv4", {
        validate: value =>
            /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/[0-9]+$/.test(
                value
            ),
        message: "Must be a valid IPv4 with CIDR notation"
    })

    extend("ipv4", {
        validate: value => {
            if (ipaddr.IPv4.isValidFourPartDecimal(value)) {
                return true
            }
            return "Must be a valid IPv4 address"
        }
    })

    extend("ipv6", {
        validate: value =>
             /^([A-f0-9:]+:+)+[A-f0-9]+$/.test(value),
        message: "Must be valid IPv6"
    })

    extend("cidrv6", {
        validate: value =>
             /^([A-f0-9:]+:+)+[A-f0-9]+\/[0-9]+$/.test(value),
        message: "Must be valid IPv6 with CIDR notation"
    })

    extend("vlan", {
        validate: value =>
            (value >= 1 && value <= 4094),
        message: "VLAN must be between 1 and 4094"
    })
    extend("none", required)

}

export default { ValidationSetup }
