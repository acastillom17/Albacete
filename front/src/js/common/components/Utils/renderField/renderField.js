import React, { useState, useEffect, useCallback } from 'react'
import Select, { Creatable, Async } from 'react-select'
import NumberFormat from 'react-number-format'
import classNames from 'classnames'
import Switch from 'react-switch'
import DayPicker from '../DayPicker'
import FileUploader from '../FileUploader/FileUploader'
import DatePicker from 'react-date-picker'
import _ from 'lodash'
import Cropper from 'react-easy-crop'
import CurrencyInput from 'react-currency-input-field'
import { Modal } from 'antd'
import Rut from '../../Utils/RUT'

export const renderField = ({
  input, placeholder, data, value, type, meta: { touched, error }
}) => {
  const invalid = touched && error

  return (
    <div>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        value={value}
        className={classNames('form-control', 'ant-input', 'fs', 'input-size', { 'is-invalid': invalid })}
      />
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </div>
  )
}

export const renderupdateField = ({
  input, placeholder, data, value, type, meta: { touched, error }
}) => {
  const invalid = touched && error
  return (
    <div>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className={classNames('form-control', 'fs', 'input-size', { 'is-invalid': invalid })}
      />
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </div>
  )
}

export const renderInitialField = ({
  input,
  placeholder,
  type,
  meta: { touched, error }
}) => {
  const invalid = touched && error
  return (
    <div>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className={classNames('form-control', {
          'is-invalid': invalid
        })}
      />
      {invalid ? <div className='invalid-feedback'>{error}</div> : null}
    </div>
  )
}

export const renderRUT = ({
  input,
  className,
  placeholder,
  name,
  type,
  defaultValue,
  meta: { touched, error }
}) => {
  const [rut, setRut] = useState(defaultValue)
  const [rutValido, setRutValido] = useState(true)
  const invalid = touched && error
  return (
    <div>
      <Rut value={rut} onValid={setRutValido} onChange={(e) => setRut(e.target.value)}>
        <input
          {...input} className={classNames('form-control', { 'is-invalid': !rutValido })}
          type={type}
          name={name}
          placeholder={placeholder}
          value={defaultValue}
          required
        />
      </Rut>

      {rutValido ? null : <div className='invalid-feedback'>INVALIDO</div>}
    </div>
  )
}

export const renderTextArea = ({
  input, placeholder, rows, meta: { touched, error }
}) => {
  const invalid = touched && error
  return (
    <div>
      <textarea
        {...input}
        placeholder={placeholder}
        style={{ resize: 'none' }}
        rows={rows || 3}
        className={classNames('form-control', { 'is-invalid': invalid })}
      />
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </div>
  )
}

export const renderNumber = ({
  input, decimalScale, placeholder, meta: { touched, error }, prefix = '', suffix = '', numberFormat
}) => {
  const invalid = touched && error
  return (
    <div>
      <NumberFormat
        placeholder={placeholder}
        className={classNames('form-control', { 'is-invalid': invalid })}
        decimalScale={decimalScale || 0}
        format={numberFormat}
        fixedDecimalScale
        value={input.value}
        thousandSeparator
        prefix={prefix}
        suffix={suffix}
        onValueChange={(values) => {
          input.onChange(values.value)
        }}
      />
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </div>
  )
}

export const renderCurrency = ({
  input, meta: { touched, error }, prefix = 'Q ', placeholder
}) => {
  const invalid = touched && error
  return (
    <div>
      <NumberFormat
        className={classNames('form-control', { 'is-invalid': invalid })}
        decimalScale={2}
        fixedDecimalScale
        placeholder={placeholder}
        value={input.value}
        thousandSeparator
        prefix={prefix}
        onValueChange={(values) => {
          input.onChange(values.value)
        }}
      />
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </div>
  )
}

export const renderCurrencyCLP = ({
  input,
  value,
  meta: { touched, error },
  prefix = '$',
  placeholder
}) => {
  const invalid = touched && error
  return (
    <div>
      <CurrencyInput
        {...input}
        className='form-control'
        name={input.name}
        maxLength='18'
        id='input-currency'
        prefix={prefix}
        placeholder={placeholder}
        groupSeparator='.'
        decimalSeparator=","
        disableGroupSeparators={false}
        value={value}
      />
      {invalid && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

export const renderSwitch = ({
  input, meta: { touched, error }, label, disabled
}) => {
  const invalid = touched && error
  return (
    <div className='d-flex align-items-center'>
      <Switch
        onColor='#007bff'
        height={18}
        width={36}
        disabled={disabled}
        onChange={(value) => {
          input.onChange(value)
        }}
        checked={input.value ? input.value : false}
      />
      {label}
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </div>
  )
}

export const renderFieldCheck = ({ input, label, value, disabled, type, meta: { touched, error } }) => {
  const invalid = touched && error
  return (
    <React.Fragment>
      <div className='checkbox c-checkbox'>
        <label className='needsclick'>
          <input
            type='checkbox'
            disabled={disabled}
            {...input}
            className={classNames('', { 'is-invalid': invalid })}
          />
          <span className='fa fa-check' />
          {label}
        </label>
      </div>
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </React.Fragment>
  )
}

export const renderFieldRadio = ({ input, label, value, disabled, meta: { touched, error } }) => {
  const invalid = touched && error
  return (
    <React.Fragment>
      <div className='radio c-radio c-radio-nofont d-flex'>
        <label className='negro font-weight-normal'>
          <input
            type='radio'
            disabled={disabled}
            {...input}
            className={classNames('', { 'is-invalid': invalid })}
          />
          <span />
          {label}
        </label>
      </div>
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </React.Fragment>
  )
}

export const SelectField = (
  {
    input,
    disabled,
    isClearable,
    isMulti,
    isSearchable,
    options,
    placeholder,
    labelKey = 'label',
    valueKey = 'value',
    meta: { touched, error }
  }) => {
  const invalid = touched && error
  const _options = []
  options.forEach(option => {
    _options.push({ ...option, label: option[labelKey], value: option[valueKey] })
  })
  let value = input.value
  if (value !== null && value !== undefined) {
    value = _.find(_options, { value })
  }

  return (
    <React.Fragment>
      <Select
        isClearable={isClearable}
        className={classNames('react-select-container', { 'is-invalid': invalid })}
        backspaceRemovesValue={false}
        isMulti={isMulti}
        isSearchable={isSearchable}
        options={_options}
        placeholder={placeholder}
        onChange={(e) => { input.onChange(e ? e[valueKey] : null) }}
        value={value}
        isDisabled={disabled}
      />
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </React.Fragment>
  )
}

export const AsyncSelectField = (
  {
    input,
    disabled,
    isClearable,
    isSearchable,
    loadOptions,
    placeholder,
    meta: { touched, error }
  }) => {
  const invalid = touched && error

  return (
    <React.Fragment>
      <Async
        isClearable={isClearable}
        cacheOptions
        className={classNames('react-select-container', { 'is-invalid': invalid })}
        backspaceRemovesValue={false}
        isSearchable={isSearchable}
        defaultOptions
        loadOptions={loadOptions}
        placeholder={placeholder}
        onChange={(e) => { input.onChange(e || null) }}
        value={input.value}
        isDisabled={disabled}
      />
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </React.Fragment>
  )
}

export const CreatableSelectField = (
  {
    input,
    disabled,
    isClearable,
    isSearchable,
    options,
    placeholder,
    labelKey = 'label',
    valueKey = 'value',
    meta: { touched, error }
  }) => {
  const invalid = touched && error
  const _options = []
  options.forEach(option => {
    _options.push({ ...option, label: option[labelKey], value: option[valueKey] })
  })

  return (
    <React.Fragment>
      <Creatable
        isClearable={isClearable}
        className={classNames('react-select-container', { 'is-invalid': invalid })}
        backspaceRemovesValue={false}
        isSearchable={isSearchable}
        options={_options}
        placeholder={placeholder}
        onChange={(e) => { input.onChange(e || null) }}
        value={input.value}
        isDisabled={disabled}
      />
      {invalid && (
        <div className='invalid-feedback'>
          {error}
        </div>
      )}
    </React.Fragment>
  )
}

/**
 * @param photo: este parametro se usa para tener la imagen previa de una imagen en dado caso el formulario es
 * usado para una actualizacion, se espera que sea la ruta donde se encuentra la imagen
 * @param setFile
 * @param className
 * @param disabled
 * @param input
 * @param touched
 * @param error
 * */
export const renderFilePicker = ({ photo, setFile, className, disabled, input, meta: { touched, error } }) => {
  const invalid = touched && error
  return (
    <div className={classNames(`${className}`, { 'is-invalid': invalid })}>
      <FileUploader
        disabled={disabled}
        img={photo || null}
        onFileChange={(e, file) => {
          file = file || e.target.files[0]
          const reader = new FileReader()
          reader.onload = (e) => {
            input.onChange(reader.result)
            if (setFile) {
              setFile(file)
            }
          }
          reader.readAsDataURL(file)
        }}
      />
      {invalid && <div className='invalid-feedback'>
        {error}
      </div>}
    </div>
  )
}

export const renderDayPicker = ({ className, disabled, maxDate, minDate, input, meta: { touched, error } }) => {
  const invalid = touched && error
  return (
    <div className={classNames(`${className}`, { 'is-invalid': invalid })}>
      <DayPicker
        disabled={disabled}
        maxDate={maxDate}
        minDate={minDate}
        onChange={e => input.onChange(e)}
        value={input.value}
      />
      {invalid && <div className='invalid-feedback'>
        {error}
      </div>}
    </div>
  )
}

export const renderDatePicker = ({ className, disabled, maxDate, minDate, input, meta: { touched, error } }) => {
  const invalid = touched && error
  return (
    <div className={classNames(`${className}`, { 'is-invalid': invalid })}>
      <DatePicker
        onChange={e => input.onChange(e)}
        disabled={disabled}
        maxDate={maxDate}
        minDate={minDate}
        value={input.value}
      />
      {invalid && <div className='invalid-feedback'>
        {error}
      </div>}
    </div>
  )
}

export const renderImageUpload = ({ aspect, className, componenteHorizontal, disabled, setFile, imagen, meta: { touched, error } }) => {
  const invalid = touched && error
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [state_modal, setOpenModal] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [imageSrc, setImgSrc] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const [active, setActive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [imagen_local, setImagen] = useState(null)

  // componentDidUpdate
  useEffect(() => {
    if (croppedImage === null && imagen !== undefined && imagen !== null) {
      setImagen(imagen)
      setLoaded(true)
    }
  }, [imagen, croppedImage])

  // // componentDidMount
  // useEffect(() => {
  //     if (imagen !== null && imagen !== undefined) {
  //         // setea la imágen si se le envia una
  //         setImagen(imagen);
  //         setLoaded(true);
  //     }
  // }, []);

  // // componentWillReceiveProps
  // useEffect(() => {
  //     if (imagen !== undefined && imagen !== null) {
  //         setImagen(imagen);
  //         setLoaded(true);
  //     }
  // }, [imagen]);

  const onZoomChange = zoom => {
    setZoom(zoom[0])
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const setFinalCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      setCroppedImage(croppedImage)
      setFile(croppedImage)
      setImagen(croppedImage)
      setLoaded(true)
      onClose()
    } catch (e) {
      console.error(e)
    }
  },
  [imageSrc, croppedAreaPixels]
  )
  const onClose = useCallback(() => {
    // setCroppedImage(null);
    setOpenModal(false)
  }, [])

  const onFileChange2 = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageDataUrl = await readFile(file)
      setImgSrc(imageDataUrl)
      setOpenModal(true)
    }
  }

  const onFileChange = (e) => {
    if (!e.target.files[0].type.match('image.*')) {
      SWALMODERROR.fire({
        title: '¡Informacion!',
        text: '¡Selecciona un archivo de tipo imagen!',
        confirmButtonText: 'Regresar',
        reverseButtons: true,
        imageUrl: alerta_img,
        imageAlt: 'Alerta',
        imageWidth: 90
      })
    } else {
      onFileChange2(e)
    }
  }

  const onDragEnter = () => {
    setActive(true)
  }

  const onDragLeave = (e) => {
    setActive(false)
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = (e) => {
    e.preventDefault()
    setActive(false)
    onFileChange(e)
  }

  return (
    <div className={classNames(`${className}`)}>
      <label
        className={`uploader ${loaded && 'loaded'}`} style={{ height: componenteHorizontal && 80 }}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <img
          src={croppedImage || (imagen_local || require('assets/img/upload.png'))}
          className={loaded ? 'loaded' : undefined}
        />
        <img style={{ opacity: loaded ? 0 : 1, maxHeight: componenteHorizontal && '50%', maxWidth: componenteHorizontal && '20%' }} className='icon icon-upload' src={require('assets/img/upload.png')} alt='' />
        <p className='texto gris text-center' style={{ opacity: loaded ? 0 : 1, height: componenteHorizontal && '110px' }}>Subir Imagen</p>
        <input
          disabled={disabled} type='file'
          accept='image/jpeg,image/jpg,image/png'
          onChange={onFileChange}
        />

      </label>
      {invalid && <div className='invalid-feedback d-flex'>
        {error}
                  </div>}
      <Modal
        visible={state_modal}
        onCancel={onClose}
        onOk={onClose}
        footer={[]}
      >
        <div className='col-12'>
          <div style={{ position: 'relative', width: '100%', height: 400, background: '#333' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              showGrid
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
              zoomWithScroll
            />
          </div>
        </div>
        <div className='mt-15 pt-15' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <button
              className='ps-btn ps-btn--gray'
              onClick={(e) => {
                e.preventDefault()
                onClose()
              }}
            >
              Cancelar
            </button>
          </div>
          <div>
            <button
              className='ps-btn'
              onClick={(e) => {
                e.preventDefault()
                setFinalCroppedImage()
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function readFile (file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const createImage = url => new Promise((resolve, reject) => {
  const image = new Image()
  image.addEventListener('load', () => resolve(image))
  image.addEventListener('error', error => reject(error))
  image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
  image.src = url
})

function getRadianAngle (degreeValue) {
  return (degreeValue * Math.PI) / 180
}

async function getCroppedImg (imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea
  canvas.height = safeArea

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  )

  // As Base64 string
  return canvas.toDataURL('image/jpeg')

  // As a blob
  // return new Promise((resolve) => {
  //     canvas.toBlob((blob) => {
  //         resolve(blob)
  //     }, 'image/jpeg')
  // })
}

export const RenderField = {
  renderField,
  renderTextArea,
  renderNumber,
  renderCurrency,
  renderSwitch,
  renderFieldCheck,
  renderFieldRadio,
  renderCurrencyCLP,
  renderImageUpload,
  renderupdateField,
  renderRUT
}
