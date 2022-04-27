/* eslint-disable react/button-has-type */
import React, { useState, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import tw from 'twin.macro'
import { destroyCookie } from 'nookies'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BiWifi } from 'react-icons/bi'
import {
    MdOutlineAir,
    MdOutlineBreakfastDining,
    MdLocalLaundryService,
    MdPool,
    MdOutlineFamilyRestroom,
} from 'react-icons/md'
import { FaSmoking, FaBeer, FaParking, FaSwimmingPool } from 'react-icons/fa'
import { GiBarbecue } from 'react-icons/gi'
import { SiDatadog } from 'react-icons/si'
import { IoIosRestaurant } from 'react-icons/io'
import { RiTvFill } from 'react-icons/ri'
import { BsFillPlusSquareFill } from 'react-icons/bs'

import { Checkbox } from 'rsuite'
import Swal from 'sweetalert2'

import axios from 'axios'
import { AccountContext } from '../contexts/AccountContext'

export default function admProduto() {
    const { userToken, setUser } = useContext(AccountContext)

    const [locais, setLocais] = useState()

    function onClickSearchButton(e) {
        e.preventDefault()
        const inputValue = document.getElementById('myInput').value

        axios
            .get(
                `https://nominatim.openstreetmap.org/search.php?q=${inputValue}&format=jsonv2`
            )
            .then((response) => {
                setLocais(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function selectCoordinates() {
        const select = document.getElementById('local')
        const { value } = select.options[select.selectedIndex]
        const lat = value.split(',')[0]
        const lon = value.split(',')[1]

        return [lat, lon]
    }

    function getCategoriaSelecionada() {
        return document.getElementById('categorias').value
    }

    function getCidadeSelecionada() {
        return document.getElementById('cidades').value
    }

    const [imagens, setImagens] = useState([])

    function postInfo() {
        if (
            document.getElementById('nomePropriedade').value !== '' &&
            document.getElementById('descricao').value !== '' &&
            document.getElementById('categorias').value !== null &&
            document.getElementById('cidades').value !== null &&
            selectCoordinates()[0] !== undefined &&
            selectCoordinates()[1] !== undefined &&
            document.getElementById('valorDiaria').value !== '' &&
            imagens.length >= 5
        ) {
            const options = {
                method: 'POST',
                url: 'http://3.84.191.143:8080/produto',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                data: {
                    nome: document.getElementById('nomePropriedade').value,
                    descricao: document.getElementById('descricao').value,
                    imagens,
                    categoriaId: parseInt(getCategoriaSelecionada(), 10),
                    caracteristicas: {
                        ar_condicionado:
                            document.getElementById('ar_condicionado').checked,
                        area_fumantes:
                            document.getElementById('area_fumantes').checked,
                        bar: document.getElementById('bar').checked,
                        cafe_da_manha:
                            document.getElementById('cafe_da_manha').checked,
                        churrasqueira:
                            document.getElementById('churrasqueira').checked,
                        estacionamento:
                            document.getElementById('estacionamento').checked,
                        hidromassagem:
                            document.getElementById('hidromassagem').checked,
                        lavanderia:
                            document.getElementById('lavanderia').checked,
                        permite_animais:
                            document.getElementById('permite_animais').checked,
                        piscina: document.getElementById('piscina').checked,
                        quartos_familia:
                            document.getElementById('quartos_familia').checked,
                        restaurante:
                            document.getElementById('restaurante').checked,
                        tvacabo: document.getElementById('tvacabo').checked,
                        wifi: document.getElementById('wifi').checked,
                    },
                    cidadeId: parseInt(getCidadeSelecionada(), 10),
                    avaliacao: 5,
                    latitude: selectCoordinates()[0],
                    longitude: selectCoordinates()[1],
                    preco: document.getElementById('valorDiaria').value,
                },
            }

            axios
                .request(options)
                .then((response) => {
                    if (response.status === 200) {
                        Router.push('/produtoCriado')
                    }
                })
                .catch((error) => {
                    if (error.toString().includes('403')) {
                        setUser(undefined)
                        destroyCookie(null, 'DB_booking_token')
                        Router.push('/login')
                    }
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha todos os campos!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#F0572D',
                // footer: '<a href="">Why do I have this issue?</a>'s
            })
        }
    }

    return (
        <>
            <SubMenu>
                <span className="text-base sm:text-lg ">Administração</span>
                <Link href="/" passHref>
                    <AiOutlineArrowLeft size={25} className="cursor-pointer" />
                </Link>
            </SubMenu>
            <div className="flex flex-col items-start justify-center w-full">
                <p className="p-4 mt-3 text-base font-semibold md:px-8 sm:text-lg">
                    Criar propriedade
                </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <Head>
                    <title>Digital Booking | Administrador</title>
                </Head>
            </div>
            <div className="h-full mx-4 mb-3 border-2 md:mx-8">
                <div className="flex-col items-start justify-start w-full p-2 mb-1 h-fit ">
                    <div>
                        <h1 className="m-1 text-sm sm:text-base">
                            Nome da propriedade:
                        </h1>
                        <input
                            className="w-full p-1 border-2 outline-primary-color"
                            id="nomePropriedade"
                        />
                    </div>

                    <div className="items-center justify-between gap-2 sm:flex ">
                        <div className="sm:w-2/4 ">
                            <h1 className="m-1 text-sm sm:text-base ">
                                Categoria:
                            </h1>
                            {/* <label htmlFor="cars">Cidade:</label> */}

                            <select
                                className="w-full p-1 border-2 outline-primary-color sm:mb-9"
                                name="categorias"
                                id="categorias"
                                onChange={() => {
                                    getCategoriaSelecionada()
                                }}
                            >
                                <option value="1">Hotéis</option>
                                <option value="2">Resorts</option>
                                <option value="3">Apartamentos</option>
                                <option value="4">Cama e café da manhã</option>
                            </select>
                        </div>

                        <div className="w-full sm:w-2/4">
                            <h1 className="m-1 mt-2 text-sm sm:text-base">
                                Endereço:
                            </h1>
                            <div className="flex w-full gap-2">
                                <form className="flex flex-col w-full gap-2 ">
                                    <div className="sm:flex ">
                                        <input
                                            className="w-full p-1 border-2 outline-primary-color"
                                            placeholder="Pesquisar local"
                                            id="myInput"
                                        />

                                        <button
                                            className="py-1 mt-2 font-bold bg-transparent border rounded cursor-pointer border-header-button-color sm:px-4 sm:ml-2 hover:bg-header-button-hover text-header-button-color hover:text-white w-36 sm:mt-0 "
                                            type="submit"
                                            name="city"
                                            onClick={(e) => {
                                                onClickSearchButton(e)
                                            }}
                                        >
                                            Pesquisar
                                        </button>
                                    </div>
                                    <select
                                        className="w-full p-1 border-2 outline-primary-color"
                                        name="local"
                                        id="local"
                                        onChange={() => {
                                            selectCoordinates()
                                        }}
                                    >
                                        {/* {!locais && <option value="locais">Locais</option>} */}
                                        <option selected disabled>
                                            --Selecione um local--
                                        </option>
                                        {locais?.map((local) => (
                                            <option
                                                value={[local.lat, local.lon]}
                                                key={local}
                                                title={local.display_name}
                                            >
                                                {local.display_name.substring(
                                                    0,
                                                    40
                                                )}
                                                ...
                                            </option>
                                        ))}
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="items-center justify-between gap-2 sm:flex">
                        <div className="sm:w-2/4">
                            <h1 className="m-1 text-sm sm:text-base">
                                Cidade:
                            </h1>
                            {/* <label htmlFor="cars">Cidade:</label> */}

                            <select
                                className="w-full p-1 border-2 outline-primary-color"
                                name="cidades"
                                id="cidades"
                                onChange={() => {
                                    getCidadeSelecionada()
                                }}
                            >
                                <option value="1">Hong Kong</option>
                                <option value="2">Bangkok</option>
                                <option value="3">Londres</option>
                                <option value="4">Singapura</option>
                                <option value="5">São Paulo</option>
                                <option value="6">Rio Janeiro</option>
                                <option value="7">Dubai</option>
                                <option value="8">Nova York</option>
                                <option value="9">Porto</option>
                                <option value="10">Paris</option>
                            </select>
                        </div>

                        <div className="sm:w-2/4">
                            <h1 className="m-1 text-sm sm:text-base">
                                Valor da diária:
                            </h1>
                            <input
                                type="number"
                                className="w-full p-1 border-2 outline-primary-color"
                                placeholder="R$0,00"
                                id="valorDiaria"
                                // onChange={() => {
                                //     getValorDiaria()
                                // }}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="m-1 text-sm sm:text-base">Descrição:</h1>
                        <textarea
                            className="w-full p-4 border-2 outline-primary-color"
                            id="descricao"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full">
                <p className="p-4 text-base font-semibold md:px-8 sm:text-lg">
                    Adicionar caracteristicas
                </p>
            </div>
            <div className="flex-col items-center justify-center mx-4 mb-3 border-2 sm:columns-2 md:columns-3 lg:columns-4 md:mx-8">
                <div>
                    <Checkbox id="wifi">
                        <BiWifi size={20} className="mr-2 cursor-pointer" />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">Wi-Fi</span>
                </div>
                <div>
                    <Checkbox id="ar_condicionado">
                        <MdOutlineAir
                            size={20}
                            className="mr-2 cursor-pointer"
                        />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">
                        Ar condicionado
                    </span>
                </div>
                <div>
                    <Checkbox id="area_fumantes">
                        <FaSmoking size={20} className="mr-2 cursor-pointer" />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">
                        Área de fumantes
                    </span>
                </div>
                <div>
                    <Checkbox id="bar">
                        <FaBeer size={20} className="mr-2 cursor-pointer" />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">Bar</span>
                </div>
                <div>
                    <Checkbox id="cafe_da_manha">
                        <MdOutlineBreakfastDining
                            size={20}
                            className="mr-2 cursor-pointer"
                        />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">Café da manhã</span>
                </div>
                <div>
                    <Checkbox id="churrasqueira">
                        <GiBarbecue size={20} className="mr-2 cursor-pointer" />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">Churrasqueira</span>
                </div>
                <div>
                    <Checkbox id="estacionamento">
                        <FaParking size={20} className="mr-2 cursor-pointer" />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">
                        Estacionamento
                    </span>
                </div>
                <div>
                    <Checkbox id="hidromassagem">
                        <FaSwimmingPool
                            size={20}
                            className="mr-2 cursor-pointer"
                        />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">Hidromassagem</span>
                </div>
                <div>
                    <Checkbox id="lavanderia">
                        <MdLocalLaundryService
                            size={20}
                            className="mr-2 cursor-pointer"
                        />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">Lavanderia</span>
                </div>
                <div>
                    <Checkbox id="permite_animais">
                        <SiDatadog size={20} className="mr-2 cursor-pointer" />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">
                        Permite animais
                    </span>
                </div>
                <div>
                    <Checkbox id="piscina">
                        <MdPool size={20} className="mr-2 cursor-pointer" />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">Piscina</span>
                </div>
                <div>
                    <Checkbox id="quartos_familia">
                        <MdOutlineFamilyRestroom
                            size={20}
                            className="mr-2 cursor-pointer"
                        />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">
                        Quartos familiares
                    </span>
                </div>
                <div>
                    <Checkbox id="restaurante">
                        <IoIosRestaurant
                            size={20}
                            className="mr-2 cursor-pointer"
                        />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">Restaurante</span>
                </div>
                <div>
                    <Checkbox id="tvacabo">
                        <RiTvFill size={20} className="mr-2 cursor-pointer " />
                    </Checkbox>
                    <span className="text-base sm:text-lg ">Tv a cabo</span>
                </div>
            </div>

            <div className="flex flex-col items-start justify-center w-full">
                <p className="p-4 text-base font-semibold md:px-8 sm:text-lg">
                    Adicionar imagens
                </p>
            </div>
            <div className="flex flex-col h-full gap-1 mb-4 border-2 md:mx-8">
                {imagens?.map((imagem) => (
                    <input key={imagem} value={imagem.url} disabled />
                ))}
            </div>

            <div className="h-full mx-4 mb-4 border-2 md:mx-8">
                <div className="flex-col items-start justify-start w-full p-2 mb-1 h-fit ">
                    <div className="flex w-full">
                        <div className="flex w-full">
                            <input
                                className="w-full p-1 border-2 outline-primary-color"
                                id="imagens"
                            />
                        </div>
                        <div>
                            <BsFillPlusSquareFill
                                size={25}
                                className="m-1 cursor-pointer"
                                onClick={() => {
                                    setImagens([
                                        ...imagens,
                                        {
                                            url: document.getElementById(
                                                'imagens'
                                            ).value,
                                            descricao: 'Imagem do local',
                                        },
                                    ])
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <button
                    onClick={() => {
                        postInfo()
                    }}
                    className="px-8 py-3 m-5 border-2 rounded-md border-primary-color text-primary-color hover:text-white hover:bg-primary-color"
                >
                    Criar
                </button>
            </div>
        </>
    )
}

const SubMenu = tw.div`
flex 
items-center 
justify-between 
w-full 
text-white 
bg-primary-color 
p-4 
md:px-8`
