import { Codec, setNetwork, IRIS ,Type} from '../src'
import chai from 'chai'
import { Buffer } from 'safe-buffer'

//setNetwork('testnet')

const assert = chai.assert
const sender = new Type.AccAddress([76, 88, 159, 138, 37, 0, 233, 9, 9, 54, 6, 236, 43, 14, 141, 39, 151, 170, 233, 196])
const fee = new Type.Coin('iris-atto', '600000000000000000')
const stdFee = new IRIS.StdFee([fee], 20000)
const pub_key = Buffer.from([235, 90, 233, 135, 33, 3, 128, 234, 6, 23, 16, 160, 236, 237, 58, 91, 222, 102, 37, 248, 194, 84, 147, 67, 253, 21, 94, 208, 251, 92, 39, 91, 77, 163, 146, 76, 185, 81])
const account_number = 2
const memo = '1'

describe('codec', () => {
  it('encode MsgSend', () => {
    const receipt = new Type.AccAddress([134, 152, 80, 35, 135, 38, 124, 211, 158, 176, 61, 130, 76, 234, 166, 214, 133, 57, 181, 7])
    const signature = Buffer.from([156, 11, 125, 181, 8, 234, 122, 109, 230, 27, 184, 196, 197, 212, 169, 207, 205, 83, 32, 139, 91, 147, 17, 87, 9, 58, 105, 173, 211, 177, 197, 155, 26, 212, 250, 0, 80, 102, 73, 14, 235, 68, 74, 28, 149, 51, 127, 182, 66, 222, 200, 153, 11, 91, 101, 37, 19, 138, 139, 79, 148, 47, 191, 147])
    const sequence = 57
    const msg = IRIS.MsgSend.create(sender, receipt, [new Type.Coin('iris-atto', '10000000000000000000')])
    const msg2 = Codec.unMarshalBinaryLengthPrefixed(Codec.marshalBinaryLengthPrefixed(msg))
    assert.equal(JSON.stringify(msg2), JSON.stringify(msg))

    const stdSignature = new IRIS.StdSignature(pub_key, [signature], account_number, sequence)
    const stdTx = new IRIS.StdTx({
      msgs: [msg],
      fee: stdFee,
      signatures: stdSignature,
      memo: memo
    })
    const bytes = Codec.marshalBinaryLengthPrefixed(stdTx)
    const expect = '9a02d91e76b00a7a2a9724ac0a390a144c589f8a2500e909093606ec2b0e8d2797aae9c412210a09697269732d6174746f1214313030303030303030303030303030303030303012390a148698502387267cd39eb03d824ceaa6d68539b50712210a09697269732d6174746f1214313030303030303030303030303030303030303012250a1f0a09697269732d6174746f121236303030303030303030303030303030303010a09c011a6e0a26eb5ae987210380ea061710a0eced3a5bde6625f8c2549343fd155ed0fb5c275b4da3924cb95112409c0b7db508ea7a6de61bb8c4c5d4a9cfcd53208b5b931157093a69add3b1c59b1ad4fa005066490eeb444a1c95337fb642dec8990b5b6525138a8b4f942fbf9318022039220131'
    assert.equal(bytes.toString('hex'), expect)

    const stdTx2 = Codec.unMarshalBinaryLengthPrefixed(bytes)
    assert.equal(JSON.stringify(stdTx), JSON.stringify(stdTx2))
    //console.log(JSON.stringify(msg.getSignBytes()))
  })

  it('encode MsgDelegate', () => {
    const validator = new Type.AccAddress([239, 109, 152, 243, 114, 255, 194, 210, 230, 20, 108, 65, 177, 146, 185, 70, 39, 151, 164, 253])
    const signature = new Type.AccAddress([193, 24, 243, 215, 239, 140, 54, 246, 94, 208, 225, 111, 23, 28, 148, 226, 15, 83, 253, 86, 85, 156, 86, 157, 118, 116, 34, 229, 72, 180, 89, 133, 56, 242, 105, 189, 30, 54, 110, 109, 44, 0, 200, 193, 40, 189, 10, 131, 197, 207, 219, 203, 158, 179, 89, 87, 228, 196, 225, 75, 138, 41, 90, 230])
    const sequence = 12
    const msg = IRIS.MsgDelegate.create(sender, validator, new Type.Coin('iris-atto', '1000000000000000000000000'))
    console.log(JSON.stringify(msg.getSignBytes()))

    const stdSignature = new IRIS.StdSignature(pub_key, [signature], account_number, sequence)
    const stdTx = new IRIS.StdTx({
      msgs: [msg],
      fee: stdFee,
      signatures: stdSignature,
      memo: memo
    })
    const bytes = Codec.marshalBinaryLengthPrefixed(stdTx)

    const expect = 'f801d91e76b00a586af6af3b0a144c589f8a2500e909093606ec2b0e8d2797aae9c41214ef6d98f372ffc2d2e6146c41b192b9462797a4fd1a260a09697269732d6174746f12193130303030303030303030303030303030303030303030303012250a1f0a09697269732d6174746f121236303030303030303030303030303030303010a09c011a6e0a26eb5ae987210380ea061710a0eced3a5bde6625f8c2549343fd155ed0fb5c275b4da3924cb9511240c118f3d7ef8c36f65ed0e16f171c94e20f53fd56559c569d767422e548b4598538f269bd1e366e6d2c00c8c128bd0a83c5cfdbcb9eb35957e4c4e14b8a295ae61802200c220131'
    assert.equal(bytes.toString('hex'), expect)

    const stdTx2 = Codec.unMarshalBinaryLengthPrefixed(bytes)
    assert.equal(JSON.stringify(stdTx), JSON.stringify(stdTx2))
  })

  it('encode and decode MsgSend', () => {
    const tx = 'lQLZHnawCnYqlySsCjcKFC6/cL8F+3dHt2r62OzI6F3XxuF4Eh8KCWlyaXMtYXR0bxISNzMwNDAxMTQwMDAwMDAwMDAwEjcKFDvFEHUEs4I/M1dfXMv4UZ0X4TtOEh8KCWlyaXMtYXR0bxISNzMwNDAxMTQwMDAwMDAwMDAwEiYKIAoJaXJpcy1hdHRvEhMyMDAwMDAwMDAwMDAwMDAwMDAwENCGAxpvCibrWumHIQKrcrNnTlL4OB0UB5174OFJ/VCAJXXtdWMETpO6AhxzyRJAMl9mh9h9dD10M27FPGJUhAdjvTAEwN9J/wRyT1A/deYbwzIDUBKIDkSLfNbsTtuG2GGdj01Ybq9WIIiC2EjFkBizQiAn'
    const txBz = new Buffer(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgDelegate', () => {
    const tx = '+gHZHnawClZq9q87ChRvnmOH06Nbe/HjZ3UHiJvFNIoqWBIUQUjWqc1EICBEmntpvID7SMRea2UaJAoJaXJpcy1hdHRvEhc1NjQ4ODAwMDAwMDAwMDAwMDAwMDAwMBIlCh8KCWlyaXMtYXR0bxISNjAwMDAwMDAwMDAwMDAwMDAwEKCNBhpvCibrWumHIQNzWoVZHQoK31cW7odpxs23ONYfYwG4LcoM5qeR/Uxm9hJAV1ZYiGClvu3eI/HjkYyEYCNqpSUoG7EbUf+gIfKMGrhebhhsrZr0CGAJC7FkOY89a2A7yDmloqEbeUZkAnmdtBjERyAIIgQ5ODg3'
    const txBz = new Buffer(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgBeginUnbonding', () => {
    const tx = '8gHZHnawClRT7PhYChTdgrgCKoPmoT9SdJLS8twmPJMRGRIUsPscdczRrb6Pmuq0nJuuqU7DynQaIjEwOTQ5OTg0OTkxMTM1MDgyMDY3Nzk1MTAwMDAwMDAwMDASJQofCglpcmlzLWF0dG8SEjQwMDAwMDAwMDAwMDAwMDAwMBDQhgMabwom61rphyEDk4uM/r0JDdyhjsz/ex9orRFnJTuh8tH9pOgFZNDkyFgSQABDQ76Vkdo6e9EGd3xNBjBDtiVY0dVZ3+vWPrsT14sBGD3EX9OE5KHv+rKHjgR50sjZdUYjYyq9v94Lp2VFmJ0YskAgSg=='
    const txBz = new Buffer(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgBeginRedelegate', () => {
    const tx = 'hALZHnawCmbmQ/puChQC9+u6uqusOvo2ODkX3Qy6lI6tthIUQUjWqc1EICBEmntpvID7SMRea2UaFNB+E+NptKEAqUpfQaCzW7bPigelIh4xMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDASJQofCglpcmlzLWF0dG8SEjYwMDAwMDAwMDAwMDAwMDAwMBCgjQYabwom61rphyEDsDWWEH8Vk26m7kAeWEvFs2KCA2N3wkcS5buhvO00QiMSQKpYIN8aR2DXhLVWjfkl5ogdWXjtJh+TCPBb3pm6Tmz6RWWvd/E2mOOmEBuNwj72u3vs6t+goszgtcJxrLyLwWgY8wEgIA=='
    const txBz = new Buffer(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgWithdrawDelegatorRewardsAll', () => {
    const tx = 'uAHZHnawChqx48v2ChTRWOI+bQmvN3llDpuBRcgFX52qIxIlCh8KCWlyaXMtYXR0bxISMzAwMDAwMDAwMDAwMDAwMDAwENCGAxpvCibrWumHIQJh6kuzo3CwUw56hUps57pBj6ibCASnEVQnmYdf5OUnUBJAilxVDNFtccovePZxN0lO3et7gYTziynRkBlTU+G3yMBXbU/B2lZKLJcyx1iNAKHIDgKe/yIJgNacP7Jil6wrqRjWRSAU'
    const txBz = new Buffer(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgWithdrawDelegatorReward', () => {
    const tx = '5QHZHnawCjAgaOF3ChR+paZ+hdKVgHIHvajf4puIH3jinxIUQUjWqc1EICBEmntpvID7SMRea2USJQofCglpcmlzLWF0dG8SEjMwMDAwMDAwMDAwMDAwMDAwMBDQhgMabwom61rphyEDeH+Mr6ANGac8ePCw12l1AMyHCmLXrWbq5d45+XEI5nMSQMtFKGYmPYM5ZOF3ZfmMd7vjcm1IySBK12y+gtXYHmXiJYHFftQ5oaCIkGzAxS7Yw296FXgazcGNhkeCoPdpFpkYgEQgIiIV5aeU5omY5Lq66aKG5Y+W5aWW5Yqx'
    const txBz = new Buffer(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgDeposit', () => {
    const tx = '3wHZHnawCkFGLTT6CAQSFKnd9CBCEFz4g9dvcZQWtt+ZdbqNGiMKCWlyaXMtYXR0bxIWMTAwMDAwMDAwMDAwMDAwMDAwMDAwMBIlCh8KCWlyaXMtYXR0bxISNDAwMDAwMDAwMDAwMDAwMDAwENCGAxpvCibrWumHIQJwkFdozku6b74ivnWky3baFFC0L49dnp5hSgvPOGNMqhJAKtZNyGb9Ee+b5zNUGh9DbrzRhPZipUQ+JbydOk5QMww3Yrg7MYIwNVJ9PVwxeyruBRUb/cQGo9LVxID4ecVX0RjZQCAr'
    const txBz = new Buffer(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgVote', () => {
    const tx = 'vAHZHnawCh4KuBjmCAQSFIUDainSsTukx5MtFvxLIXZ+4wE3GAMSJQofCglpcmlzLWF0dG8SEjQwMDAwMDAwMDAwMDAwMDAwMBDQhgMabwom61rphyECssg4jFHxaEV7uMZTNtyIipBVSGs5w7GErB9sxehYYGwSQDSqwCD50S3DJZTz9+kX49VvqGz7AaJqTPFEVV3uQPchf0Hj7PW2/0oAgQk5admpCcu14AHzv7THT4igOZtpSIsYsAIgIA=='
    const txBz = new Buffer(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })
  //
  it('MsgVote', () => {
    console.log(new Type.AccAddress(0) instanceof Type.AccAddress)
    console.log(new Type.AccAddress(0) instanceof Buffer)
    console.log(sender.toString("iaa"))
  })
})
