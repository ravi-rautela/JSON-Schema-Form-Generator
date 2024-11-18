import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface JSONSchema {
  formTitle?: string;
  formDescription?: string;
  fields?: Field[];
}

interface JSONSchemaFormProps {
  schema: JSONSchema;
}

export const JSONSchemaForm: React.FC<JSONSchemaFormProps> = ({ schema }) => {
  const { formTitle, formDescription, fields = [] } = schema;

  // Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Form submission handler
  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log('Form Submission:', data);
    alert('Form submitted successfully!');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-6 bg-white shadow-md rounded"
    >
      {/* Form Title */}
      {formTitle && <h1 className="text-2xl font-bold text-gray-800">{formTitle}</h1>}

      {/* Form Description */}
      {formDescription && <p className="text-gray-600">{formDescription}</p>}

      {/* Dynamically Render Fields */}
      {fields.map((field) => {
        if (!field.id || !field.type) {
          console.error(`Field is missing required "id" or "type":`, field);
          return null; // Skip rendering invalid fields
        }

        return (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="block font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {/* Render Input Fields Based on Type */}
            {field.type === 'text' && (
              <input
                id={field.id}
                type="text"
                placeholder={field.placeholder}
                {...register(field.id, { required: field.required })}
                className="border border-gray-300 rounded w-full p-2 focus:ring focus:ring-blue-300"
              />
            )}

            {field.type === 'email' && (
              <input
                id={field.id}
                type="email"
                placeholder={field.placeholder}
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern
                    ? {
                        value: new RegExp(field.validation.pattern),
                        message: field.validation.message || 'Invalid email format',
                      }
                    : undefined,
                })}
                className="border border-gray-300 rounded w-full p-2 focus:ring focus:ring-blue-300"
              />
            )}

            {field.type === 'textarea' && (
              <textarea
                id={field.id}
                placeholder={field.placeholder}
                {...register(field.id, { required: field.required })}
                className="border border-gray-300 rounded w-full p-2 focus:ring focus:ring-blue-300"
              />
            )}

            {field.type === 'select' && field.options && (
              <select
                id={field.id}
                {...register(field.id, { required: field.required })}
                className="border border-gray-300 rounded w-full p-2 focus:ring focus:ring-blue-300"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'radio' && field.options && (
              <div className="space-y-1">
                {field.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <input
                      id={`${field.id}-${option.value}`}
                      type="radio"
                      value={option.value}
                      {...register(field.id, { required: field.required })}
                      className="focus:ring focus:ring-blue-300"
                    />
                    <label htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {errors[field.id] && (
              <p className="text-red-500 text-sm">
                {'This field is required'}
              </p>
            )}
          </div>
        );
      })}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};
