import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { MdVerified } from 'react-icons/md'
import tw from 'twin.macro'
import { Container } from '../styles/globalStyles'

export default function NovoModal() {
    return (
        <Container>
            <PrimeiraDiv>
                <Head>
                    <title>Digital Booking | Criação pronta!</title>
                </Head>
            </PrimeiraDiv>
            <Informacoes>
                <div className="p-2">
                    <MdVerified size="4.5em" color="#F0572D" />
                </div>
                <DivTexto>
                    <Texto>Sua propriedade foi criada com sucesso.</Texto>
                </DivTexto>

                <Link href="/admin" passHref>
                    <Button type="button">Voltar</Button>
                </Link>
            </Informacoes>
        </Container>
    )
}

const PrimeiraDiv = tw.div`
flex 
flex-col 
items-center 
justify-center
w-full
`

const Informacoes = tw.div`
flex 
flex-col 
items-center 
justify-center 
rounded-lg 
shadow 
border-2 
box-border 
px-2 
sm:px-20 
md:px-20 
lg:px-20 
xl:px-36 
py-4
`

const Texto = tw.p`
text-center
text-base 
sm:text-lg 
md:text-xl 
lg:text-xl 
font-bold
`
const Button = tw.button`
px-16 
py-2 
sm:px-20 
md:px-24 
md:py-3 
lg:px-28 
lg:py-3 
xl:px-32 
xl:py-3 
2xl:px-36 
2xl:py-4 
sm:py-3 
sm:text-base 
md:text-lg 
lg:text-xl 
m-5 
border-2 
rounded-md 
border-primary-color 
text-primary-color 
hover:text-white 
hover:bg-primary-color   
`

const DivTexto = tw.div`
flex 
flex-col 
items-center 
justify-center 
mx-6 
my-3 
`

// const InfoDiv = tw.div`
// flex
// flex-col
// items-center
// justify-center
// rounded-lg
// shadow
// border-2
// box-border
// px-3
// sm:px-24
// md:px-{26}
// lg:px-28
// xl:px-36
// py-4
// `
