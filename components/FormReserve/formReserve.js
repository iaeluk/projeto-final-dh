// import tw from 'twin.macro'
import { Formik, Form } from 'formik'
import { useContext, useState } from 'react'
import TextField from '../TextField'
import { AccountContext } from '../../contexts/AccountContext'

export default function FormReserve() {
    const { user } = useContext(AccountContext)

    const [cidade, setCidade] = useState()
    return (
        <Formik>
            <Form className="flex flex-col sm:flex-row md:w-[100%] lg:w-[130%] shadow-xl md:grid-cols-2 gap-4 routed-xl p-8 md:mx-8 mx-3">
                <div className="flex flex-col w-full gap-1 mr-2 text-center">
                    <TextField
                        className="bg-[#DFE4EA]"
                        label="Nome"
                        name="firstName"
                        type="text"
                        placeholder={user.nome || ''}
                        disabled
                    />
                    <TextField
                        className="bg-[#DFE4EA]"
                        label="E-mail"
                        name="email"
                        type="email"
                        placeholder={user.email || ''}
                        disabled
                    />
                </div>

                <div className="flex flex-col w-full gap-1 mr-2 text-center">
                    <TextField
                        className="bg-[#DFE4EA]"
                        label="Sobrenome"
                        name="lastName"
                        type="text"
                        placeholder={user.sobrenome || ''}
                        disabled
                    />

                    <TextField
                        className="bg-[#DFE4EA]"
                        label="Cidade"
                        name="city"
                        type="text"
                        value={cidade}
                        onChange={(event) => {
                            setCidade(event.target.value)
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </Form>
        </Formik>
    )
}
