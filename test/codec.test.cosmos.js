import { Codec } from '../src'
import { Buffer } from 'safe-buffer'

describe('codec cosmos', () => {
  it('encode and decode MsgSend', () => {
    const tx = '1AHwYl3uCkGoo2GaChR/J4xYV8Q59LluXUY/xdGPaCN/TRIUFxBmxyKHzDxty6lArsleBGvLWXcaDwoFdWF0b20SBjI4MDAwMBITCg0KBXVhdG9tEgQyMDAwEMCaDBpqCibrWumHIQOxQGm+E3DpnIsNzYxQxTKI0zb+bf2tvVf8sL2v0OpNrhJA7fNPrNcHluskBMo0HdADcPIcYq0mcx3EfUgy5K4JR4Fr13cqCu8gTeG9djaKl+amIv1iiPfji0YO5LomEcPGYCIKc2VuZHRvY29sZA=='
    const txBz = Buffer.from(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    //console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgDelegate', () => {
    const tx = '+gHZHnawClZq9q87ChRvnmOH06Nbe/HjZ3UHiJvFNIoqWBIUQUjWqc1EICBEmntpvID7SMRea2UaJAoJaXJpcy1hdHRvEhc1NjQ4ODAwMDAwMDAwMDAwMDAwMDAwMBIlCh8KCWlyaXMtYXR0bxISNjAwMDAwMDAwMDAwMDAwMDAwEKCNBhpvCibrWumHIQNzWoVZHQoK31cW7odpxs23ONYfYwG4LcoM5qeR/Uxm9hJAV1ZYiGClvu3eI/HjkYyEYCNqpSUoG7EbUf+gIfKMGrhebhhsrZr0CGAJC7FkOY89a2A7yDmloqEbeUZkAnmdtBjERyAIIgQ5ODg3'
    const txBz = Buffer.from(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgBeginUnbonding', () => {
    const tx = '8gHZHnawClRT7PhYChTdgrgCKoPmoT9SdJLS8twmPJMRGRIUsPscdczRrb6Pmuq0nJuuqU7DynQaIjEwOTQ5OTg0OTkxMTM1MDgyMDY3Nzk1MTAwMDAwMDAwMDASJQofCglpcmlzLWF0dG8SEjQwMDAwMDAwMDAwMDAwMDAwMBDQhgMabwom61rphyEDk4uM/r0JDdyhjsz/ex9orRFnJTuh8tH9pOgFZNDkyFgSQABDQ76Vkdo6e9EGd3xNBjBDtiVY0dVZ3+vWPrsT14sBGD3EX9OE5KHv+rKHjgR50sjZdUYjYyq9v94Lp2VFmJ0YskAgSg=='
    const txBz = Buffer.from(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    //console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgBeginRedelegate', () => {
    const tx = 'hALZHnawCmbmQ/puChQC9+u6uqusOvo2ODkX3Qy6lI6tthIUQUjWqc1EICBEmntpvID7SMRea2UaFNB+E+NptKEAqUpfQaCzW7bPigelIh4xMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDASJQofCglpcmlzLWF0dG8SEjYwMDAwMDAwMDAwMDAwMDAwMBCgjQYabwom61rphyEDsDWWEH8Vk26m7kAeWEvFs2KCA2N3wkcS5buhvO00QiMSQKpYIN8aR2DXhLVWjfkl5ogdWXjtJh+TCPBb3pm6Tmz6RWWvd/E2mOOmEBuNwj72u3vs6t+goszgtcJxrLyLwWgY8wEgIA=='
    const txBz = Buffer.from(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    //console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgWithdrawDelegatorRewardsAll', () => {
    const tx = 'uAHZHnawChqx48v2ChTRWOI+bQmvN3llDpuBRcgFX52qIxIlCh8KCWlyaXMtYXR0bxISMzAwMDAwMDAwMDAwMDAwMDAwENCGAxpvCibrWumHIQJh6kuzo3CwUw56hUps57pBj6ibCASnEVQnmYdf5OUnUBJAilxVDNFtccovePZxN0lO3et7gYTziynRkBlTU+G3yMBXbU/B2lZKLJcyx1iNAKHIDgKe/yIJgNacP7Jil6wrqRjWRSAU'
    const txBz = Buffer.from(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    //console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgWithdrawDelegatorReward', () => {
    const tx = '5QHZHnawCjAgaOF3ChR+paZ+hdKVgHIHvajf4puIH3jinxIUQUjWqc1EICBEmntpvID7SMRea2USJQofCglpcmlzLWF0dG8SEjMwMDAwMDAwMDAwMDAwMDAwMBDQhgMabwom61rphyEDeH+Mr6ANGac8ePCw12l1AMyHCmLXrWbq5d45+XEI5nMSQMtFKGYmPYM5ZOF3ZfmMd7vjcm1IySBK12y+gtXYHmXiJYHFftQ5oaCIkGzAxS7Yw296FXgazcGNhkeCoPdpFpkYgEQgIiIV5aeU5omY5Lq66aKG5Y+W5aWW5Yqx'
    const txBz = Buffer.from(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    //console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgDeposit', () => {
    const tx = '3wHZHnawCkFGLTT6CAQSFKnd9CBCEFz4g9dvcZQWtt+ZdbqNGiMKCWlyaXMtYXR0bxIWMTAwMDAwMDAwMDAwMDAwMDAwMDAwMBIlCh8KCWlyaXMtYXR0bxISNDAwMDAwMDAwMDAwMDAwMDAwENCGAxpvCibrWumHIQJwkFdozku6b74ivnWky3baFFC0L49dnp5hSgvPOGNMqhJAKtZNyGb9Ee+b5zNUGh9DbrzRhPZipUQ+JbydOk5QMww3Yrg7MYIwNVJ9PVwxeyruBRUb/cQGo9LVxID4ecVX0RjZQCAr'
    const txBz = Buffer.from(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    //console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)
  })

  it('encode and decode MsgVote', () => {
    const tx = 'vAHZHnawCh4KuBjmCAQSFIUDainSsTukx5MtFvxLIXZ+4wE3GAMSJQofCglpcmlzLWF0dG8SEjQwMDAwMDAwMDAwMDAwMDAwMBDQhgMabwom61rphyECssg4jFHxaEV7uMZTNtyIipBVSGs5w7GErB9sxehYYGwSQDSqwCD50S3DJZTz9+kX49VvqGz7AaJqTPFEVV3uQPchf0Hj7PW2/0oAgQk5admpCcu14AHzv7THT4igOZtpSIsYsAIgIA=='
    const txBz = Buffer.from(tx, 'base64')
    const stdTx = Codec.unMarshalBinaryLengthPrefixed(txBz)
    //console.log(JSON.stringify(stdTx))

    const bz = Codec.marshalBinaryLengthPrefixed(stdTx)
    assert.equal(Buffer.from(bz).toString("base64"), tx)


    console.log(Codec.marshalJSON({
      A:1,
      B:2
    }))
  })
})
