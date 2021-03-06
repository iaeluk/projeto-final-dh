/* eslint-disable react/button-has-type */
import { useState, useContext } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import tw from 'twin.macro'
import {
    FaMapMarkerAlt,
    FaSmoking,
    FaBeer,
    FaParking,
    FaSwimmingPool,
} from 'react-icons/fa'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import {
    MdPets,
    MdFamilyRestroom,
    MdPool,
    MdOutlineAir,
    MdOutlineBreakfastDining,
} from 'react-icons/md'
import { FiWifi } from 'react-icons/fi'
import { GiClothes, GiBarbecue } from 'react-icons/gi'
import { IoMdRestaurant } from 'react-icons/io'

import { RiTvFill } from 'react-icons/ri'

import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Router from 'next/router'

import { InputAdornment, useMediaQuery, Stack } from '@mui/material'
import { DateRange } from '@mui/icons-material'
import { DateRangePicker } from '@mui/lab'
import { useTheme } from '@mui/material/styles'
import { ptBR } from 'date-fns/locale'
import moment from 'moment'
import { AccountContext } from '../../../contexts/AccountContext'
import RatingStars from '../../../components/RatingStars'
import MobileGallery from '../../../components/Gallery/mobileGallery'
import DesktopGallery from '../../../components/Gallery/desktopGallery'

const Map = dynamic(() => import('../../../components/Map'), {
    ssr: false,
})

/**
 * Renders SearchBar component with search Location end Date
 * @param {func} [handleSubmit] - function to be called when submit button is clicked
 * @param {boolean} [column] - if true, search bar will be displayed in a column
 */
export default function Product({ locale, mapData, column, dateToDisable }) {
    const { user, initialRangeDate, setInitialRangeDate } =
        useContext(AccountContext)

    const { nome, descricao, imagens, caracteristicas, avaliacao, preco } =
        locale

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [value, setValue] = useState(initialRangeDate || [null, null])
    const isColumn = column || isMobile

    const disableDate = (date) => {
        for (let i = 0; i < dateToDisable.length; i += 1) {
            if (
                moment(date) >= moment(`${dateToDisable[i].checkIn}`) &&
                moment(date) <= moment(`${dateToDisable[i].checkOut}`)
            ) {
                return true
            }
        }

        return null
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Head>
                <title>Digital Booking | {nome}</title>
            </Head>

            <SubMenu>
                <SubMenuInfo>
                    <span className="">
                        {mapData.address.city || mapData.address.country}
                    </span>
                    <span className="text-lg">{nome}</span>
                </SubMenuInfo>
                <Link href="/" passHref>
                    <AiOutlineArrowLeft size={25} className="cursor-pointer" />
                </Link>
            </SubMenu>

            <GeoMenu>
                <span className="flex items-center gap-2">
                    <FaMapMarkerAlt size={18} />{' '}
                    {`${mapData.address.road},
                       ${mapData.address.county || ''},
                       ${mapData.address.country || ''}
                       `}
                </span>
            </GeoMenu>

            <div className="xl:w-[1200px]">
                <DesktopGallery imgs={imagens} />
                <div className="md:hidden">
                    <MobileGallery imgs={imagens} />
                </div>
                <Container>
                    <InfoContainer>
                        <InfoTextContainer>
                            <TitleAndStarContainer>
                                <span className="underline underline-offset-4">
                                    {nome}
                                </span>
                                <span className="flex items-center justify-end gap-2">
                                    <RatingStars rating={avaliacao} />{' '}
                                </span>
                            </TitleAndStarContainer>
                            <div className="font-bold text-right text-md text-primary-color">
                                R${preco}
                            </div>
                            <DescriptionContainer>
                                {descricao}
                            </DescriptionContainer>

                            <div>
                                <h2 className="w-full mb-3 text-lg font-bold text-left text-primary-color">
                                    O que esse lugar oferece
                                </h2>
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {caracteristicas.wifi ? (
                                        <div className="flex gap-2">
                                            <FiWifi
                                                size={20}
                                                title="Wi-fi gr??tis"
                                            />
                                            <span>Wifi</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {caracteristicas.hidromassagem ? (
                                        <div className="flex gap-2">
                                            <FaSwimmingPool
                                                size={20}
                                                title="Hidromassagem"
                                            />
                                            <span>Hidromassagem</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {caracteristicas.estacionamento ? (
                                        <div className="flex gap-2">
                                            <FaParking
                                                size={20}
                                                title="Estacionamento"
                                            />
                                            <span>Estacionamento</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {caracteristicas.cafeDaManha ? (
                                        <div className="flex gap-2">
                                            <MdOutlineBreakfastDining
                                                size={20}
                                                title="Caf?? da manh??"
                                            />
                                            <span>Caf?? da manh??</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {caracteristicas.areaFumantes ? (
                                        <div className="flex gap-2">
                                            <FaSmoking
                                                size={20}
                                                title="??rea de fumantes"
                                            />
                                            <span>??rea de fumantes</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {caracteristicas.quartosFamilia ? (
                                        <div className="flex gap-2">
                                            <MdFamilyRestroom
                                                size={20}
                                                title="Quartos para fam??lia"
                                            />
                                            <span>Quartos para fam??lia</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {caracteristicas.bar ? (
                                        <div className="flex gap-2">
                                            <FaBeer size={20} title="Bar" />
                                            <span>Bar</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {caracteristicas.restaurante ? (
                                        <div className="flex gap-2">
                                            <IoMdRestaurant
                                                size={20}
                                                title="Tem restaurante"
                                            />
                                            <span>Restaurante</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {caracteristicas.churrasqueira ? (
                                        <div className="flex gap-2">
                                            <GiBarbecue
                                                size={20}
                                                title="Churrasqueira gr??tis"
                                            />
                                            <span>Churrasqueira gr??tis</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {caracteristicas.permiteAnimais ? (
                                        <div className="flex gap-2">
                                            <MdPets
                                                size={20}
                                                title="Permitido animais"
                                            />
                                            <span>Permitido animais</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {caracteristicas.piscina ? (
                                        <div className="flex gap-2">
                                            <MdPool
                                                size={20}
                                                title="Tem piscina"
                                            />

                                            <span>Piscina inclusa</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {caracteristicas.lavanderia ? (
                                        <div className="flex gap-2">
                                            <GiClothes
                                                size={20}
                                                title="Lavanderia gr??tis"
                                            />

                                            <span>Lavanderia gr??tis</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {caracteristicas.arCondicionado ? (
                                        <div className="flex gap-2">
                                            <MdOutlineAir
                                                size={20}
                                                title="Ar condicionado"
                                            />

                                            <span>Ar condicionado</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {caracteristicas.tvACabo ? (
                                        <div className="flex gap-2">
                                            <RiTvFill
                                                size={20}
                                                title="Ar condicionado"
                                            />

                                            <span>Ar condicionado</span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </InfoTextContainer>
                    </InfoContainer>

                    <div className="flex flex-col items-center w-full pb-5">
                        <div className="w-full ">
                            <h2 className="w-full mb-3 text-lg font-bold text-left text-primary-color">
                                Datas dispon??veis
                            </h2>
                            <div className="flex flex-col place-items-center ">
                                <div className="items-center justify-center col-span-2 bg-[#f0f0f0] md:flex">
                                    <LocalizationProvider
                                        locale={ptBR}
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DateRangePicker
                                            startText="Check-in"
                                            endText="Check-out"
                                            value={value}
                                            disablePast
                                            shouldDisableDate={disableDate}
                                            desktopModeMediaQuery="@media (min-width:700px)"
                                            clearable
                                            clearText="Limpar"
                                            cancelText="Cancelar"
                                            inputFormat="dd/MM/yyyy"
                                            toolbarFormat="dd/MMMM"
                                            mask="__/__/____"
                                            toolbarTitle="Selecione o per??odo"
                                            onChange={(newValue) => {
                                                setValue(newValue)
                                                setInitialRangeDate(newValue)
                                            }}
                                            renderInput={(
                                                startProps,
                                                endProps
                                            ) => (
                                                <Stack
                                                    direction={
                                                        isColumn
                                                            ? 'column'
                                                            : 'row'
                                                    }
                                                    flex="1 1 auto"
                                                >
                                                    <TextField
                                                        sx={{
                                                            flex: '1 1 min-content',
                                                        }}
                                                        variant="filled"
                                                        fullWidth
                                                        InputProps={{
                                                            className:
                                                                'InputBase-root-start-date',
                                                            disableUnderline: true,
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    {' '}
                                                                    <DateRange />{' '}
                                                                </InputAdornment>
                                                            ),
                                                            componentsProps: {
                                                                input: {
                                                                    name: 'dataCheckin',
                                                                },
                                                            },
                                                        }}
                                                        {...{
                                                            ...startProps,
                                                            inputProps: {
                                                                ...startProps.inputProps,
                                                                placeholder:
                                                                    'Quando?',
                                                            },
                                                        }}
                                                    />
                                                    <TextField
                                                        sx={{
                                                            flex: '1 1 min-content',
                                                        }}
                                                        variant="filled"
                                                        fullWidth
                                                        InputProps={{
                                                            className:
                                                                'InputBase-root-end-date',
                                                            disableUnderline: true,
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <DateRange />
                                                                </InputAdornment>
                                                            ),
                                                            componentsProps: {
                                                                input: {
                                                                    name: 'dataCheckout',
                                                                },
                                                            },
                                                        }}
                                                        {...{
                                                            ...endProps,
                                                            inputProps: {
                                                                ...endProps.inputProps,
                                                                placeholder:
                                                                    'Quando?',
                                                            },
                                                        }}
                                                    />
                                                </Stack>
                                            )}
                                        />
                                    </LocalizationProvider>
                                    <div className="flex flex-col items-center justify-center w-full h-40 gap-3 p-4 bg-[#f0f0f0] rounded-md">
                                        <span className="flex items-center">
                                            Adicione as datas da sua viagem para
                                            obter pre??os exatos.
                                        </span>
                                        <MobileButton
                                            onClick={() => {
                                                if (
                                                    user &&
                                                    initialRangeDate !== null &&
                                                    initialRangeDate !==
                                                        undefined
                                                ) {
                                                    Router.push(
                                                        `/reserva/${locale.id}`
                                                    )
                                                }

                                                if (!user) {
                                                    Router.push('/login')
                                                }
                                            }}
                                        >
                                            RESERVAR
                                        </MobileButton>
                                    </div>
                                </div>
                                {initialRangeDate === null ||
                                initialRangeDate === undefined ? (
                                    <span className="text-red-500">
                                        Selecione uma data antes de fazer sua
                                        reserva.
                                    </span>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        <span id="map" />
                        <h2 className="w-full mt-8 mb-3 text-lg font-bold text-left text-primary-color">
                            Localiza????o no mapa
                        </h2>
                        <div className="relative w-full h-72 z-[1]">
                            <Map geo={mapData} />
                        </div>

                        <div className="grid mt-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col w-full pb-5">
                                <h2 className="mb-3 text-lg font-bold text-primary-color">
                                    Regras
                                </h2>
                                <p className="pr-4 text-justify">
                                    Check-in: Depois das 16:00
                                    <br /> Checkout: A partir das 09:00 <br />
                                    Adequado para crian??as ou beb??s
                                    <br />
                                    Proibido fumar
                                    <br />
                                    Permite animais de estima????o <br />
                                    {/* Regras adicionais */}
                                    Todos os titulares de cart??o de cr??dito
                                    devem ter 25 anos ou mais no momento da
                                    reserva.
                                </p>
                            </div>
                            <div className="flex flex-col w-full pb-5">
                                <h2 className="mb-3 text-lg font-bold text-primary-color">
                                    Sa??de e seguran??a
                                </h2>
                                <p className="pr-4 text-justify">
                                    N??o h?? alarme de mon??xido de carbono.
                                    <br />
                                    N??o h?? alarme de fuma??a. <br />
                                    Durante a pandemia Higienize as superf??cies.
                                    <br />
                                    Use produtos de limpeza aprovados por
                                    especialistas em sa??de, como desinfetantes
                                    com 70% de ??lcool ou mais. Limpe
                                    cuidadosamente.
                                    <br />
                                    Use m??scara Lave toda a roupa de cama e
                                    toalhas.
                                    <br />
                                    Siga todas as outras orienta????es locais.
                                </p>
                            </div>
                            <div className="flex flex-col w-full pb-5 sm:col-span-2 lg:col-span-1">
                                <h2 className="mb-3 text-lg font-bold text-primary-color">
                                    Pol??tica de cancelamento
                                </h2>
                                <p className="pr-4 text-justify">
                                    Cancelamento gratuito por 48 horas depois da
                                    reserva.
                                    <br />
                                    Depois de 48 horas de realizar a reserva, o
                                    reembolso ser?? de 50%, menos a taxa de
                                    servi??o.
                                    <br />
                                    Em caso de cancelamento no dia do check-in,
                                    o cliente ter?? dereito ao reembolso da taxa
                                    de limpeza, se j?? estiver paga.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

const Container = tw.div`flex flex-col items-center justify-center flex-1 text-gray-500 px-4 md:px-8`

const SubMenu = tw.div`flex items-center justify-between w-full text-white bg-primary-color p-4 md:px-8`

const SubMenuInfo = tw.div`flex flex-col font-bold`

const GeoMenu = tw.div`flex items-start justify-between w-full gap-1 p-3 font-semibold px-4 md:px-8`

const InfoContainer = tw.div`flex flex-col items-center justify-center flex-1 md:flex-row`

const InfoTextContainer = tw.div`my-5`

const TitleAndStarContainer = tw.div`flex justify-between text-lg font-bold text-primary-color`

const DescriptionContainer = tw.p`my-4 text-justify text-gray-500`

const MobileButton = tw.button` w-full sm:w-[70%] px-10 h-10 mx-4 font-bold text-white uppercase rounded-md bg-primary-color`

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://3.84.191.143:8080/produto/${params.id}`)
    const locale = await res.json()

    const map = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=pt&lat=${locale.latitude}&lon=${locale.longitude}&zoom=18&addressdetails=1`
    )
    const mapData = await map.json()

    const date = await fetch(
        `http://3.84.191.143:8080/reserva/produto/${params.id}`
    )
    const dateToDisable = await date.json()

    return {
        props: {
            locale,
            mapData,
            dateToDisable,
        },
    }
}
