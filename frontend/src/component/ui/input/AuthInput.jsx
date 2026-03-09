import React from 'react'

const AuthInput = ({ label, icon: Icon, type, placeholder, error, register }) => {
  return (
    <div>
      <label className="text-sm text-slate-300">{label}</label>
      <div className="relative mt-1">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className={`authInputFields ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error.message}
        </p>
      )}
    </div>
  )
}

export default AuthInput

