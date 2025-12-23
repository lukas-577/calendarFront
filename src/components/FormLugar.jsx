import { useRef } from 'react';

export default function FormLugar({
    label,
    nombre,
    descripcion,
    onNombreChange,
    onDescripcionChange,
    onFileChange,
    accept,
    onSubmit,
}) {
    const formRef = useRef(null);

    const handleSubmit = (event) => {
        const form = formRef.current;

        if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        } else {
        // Solo llama a tu onSubmit si el formulario es válido
        onSubmit(event);
        }

        form.classList.add('was-validated');
    };
    return (
        <form  ref={formRef} onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-2">
                <label className="form-label">Nombre Lugar</label>
                <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={onNombreChange}
                    required
                />
                <div className="invalid-feedback">
                    Por favor ingresa el nombre del lugar.
                </div>
            </div>

            <div className="mb-2">
                <label className="form-label">Descripción</label>
                <input
                    type="text"
                    className="form-control"
                    value={descripcion}
                    onChange={onDescripcionChange}
                    required
                />
                <div className="invalid-feedback">
                    Por favor ingresa la descripción.
                </div>
            </div>

            <div className="mb-2">
                <label className="form-label">{label}</label>
                <input
                    className="form-control"
                    type="file"
                    onChange={onFileChange}
                    accept={accept}
                    required
                />
                <div className="invalid-feedback">
                    Debes seleccionar una imagen.
                </div>
            </div>

            <button type="submit" className="btn btn-primary">
                Guardar lugar
            </button>
        </form>
    );
}
