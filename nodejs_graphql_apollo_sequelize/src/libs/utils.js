import casual from 'casual'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, BLOB_ACCOUNT, BLOB_SECRET } from '../secrets'
import SysInvalidSession from '../models/sysInvalidSession'
import SysVerify from '../models/sysVerify'
import Sequelize from 'sequelize'
import Azure from 'azure'
export const generateNumericCode = (digits) => {
    const numbers="01234567890"
    let ret = ""
    for(let i=0; i < digits; i++) {
        ret += numbers.charAt(Math.floor(Math.random() * 10))
    }
    return ret
}
export const generateRandonChars = (digits) => {
    const numbers="01234567890abcdefghijklmABCDEFGHIJKLM"
    let ret = ""
    for(let i=0; i < digits; i++) {
        ret += numbers.charAt(Math.floor(Math.random() * 36))
    }
    return ret
}
export const cleanExpiredRecords = () => {
    SysInvalidSession.destroy({
        where: {
            expiresOn: {
                [Sequelize.Op.lte]: new Date(Date.now()).toISOString()
            }
        }
    })
    SysVerify.destroy({
        where: {
            expiresOn: {
                [Sequelize.Op.lte]: new Date(Date.now()).toISOString()
            }
        }
    })
}
export const generateJwtToken = (hoursExp, USER_id) => {
    const expiresIn = hoursExp + 'h'
    return jwt.sign({USER_id}
        , JWT_SECRET,
        { expiresIn }
    )
}
export const generateBlobUrl = (format) => {
    const fileName = generateRandonChars(16) + '.' + format.toLowerCase()
    const blob = Azure.createBlobService(BLOB_ACCOUNT, BLOB_SECRET)
    const sharedAccessPolicy = { AccessPolicy: {
        Expiry: Azure.date.minutesFromNow(60),
        Permissions: Azure.Constants.BlobConstants.SharedAccessPermissions.WRITE
      }}
      const sasToken = blob.generateSharedAccessSignature('users', fileName, sharedAccessPolicy);
    return blob.getUrl('users', fileName, sasToken)
}