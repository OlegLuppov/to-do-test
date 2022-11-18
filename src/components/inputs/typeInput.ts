import React from "react"

export type TypeInputTitle = {
    type:string
    placeholder:string
    valueTitle:string
    onChange(e:React.ChangeEvent<HTMLInputElement>):void

}

export type TypeInputDate = {
    valueDate:string
    onChange(e:React.ChangeEvent<HTMLInputElement>):void
}