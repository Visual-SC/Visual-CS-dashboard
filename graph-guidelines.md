# Guía de implementación: Bar Chart con Chart.js

> Basada en el diseño de referencia "Histórico de Ingresos" y la documentación oficial de [Chart.js – Bar Chart](https://www.chartjs.org/docs/latest/charts/bar.html).

---

## 1. Análisis visual del diseño de referencia

A partir de las imágenes proporcionadas se identifican los siguientes rasgos:

| Elemento | Detalle observado |
|---|---|
| **Tipo de gráfica** | Bar chart vertical (columnas) |
| **Colores de barras** | Azul claro (`#B2D8D8` aprox.), sin borde visible |
| **Border radius** | Esquinas superiores redondeadas (≈ 6–8 px) |
| **Fondo del card** | Blanco con sombra sutil |
| **Grilla** | Líneas horizontales punteadas, color gris muy claro |
| **Eje Y** | Valores en pesos colombianos (formato `$ 100.000`) |
| **Eje X** | Días de la semana (Lunes a Viernes) |
| **Líneas de eje** | Sin borde inferior/lateral visible (ejes ocultos) |
| **Tooltip / hover** | Card flotante (visible en imagen 2) con fondo claro |
| **Título** | "Histórico de Ingresos" con ícono a la derecha |
| **Menú contextual** | Tres puntos `···` en la esquina superior derecha |

---

## 2. Instalación de Chart.js

### Via CDN (HTML puro)

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

### Via npm (React, Vue, etc.)

```bash
npm install chart.js
```

---

## 3. Estructura HTML base

```html
<div class="card">
  <div class="card-header">
    <h3>Histórico de Ingresos 📊</h3>
    <span class="menu">···</span>
  </div>
  <canvas id="ingresoChart"></canvas>
</div>
```

---

## 4. Configuración completa del chart

```javascript
const ctx = document.getElementById('ingresoChart').getContext('2d');

const data = {
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
  datasets: [
    {
      label: 'Ingresos',
      data: [400000, 700000, 400000, 300000, 400000],

      // ── Colores ─────────────────────────────────────────
      backgroundColor: 'rgba(178, 216, 216, 0.85)', // azul-teal claro
      hoverBackgroundColor: 'rgba(140, 195, 195, 1)',
      borderColor: 'transparent',
      borderWidth: 0,

      // ── Forma de la barra ────────────────────────────────
      borderRadius: 8,          // esquinas superiores redondeadas
      borderSkipped: 'bottom',  // solo redondear la parte superior

      // ── Ancho de barras ──────────────────────────────────
      barPercentage: 0.55,      // porcentaje del espacio de categoría
      categoryPercentage: 0.8,
    },
  ],
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: true,

    // ── Layout ────────────────────────────────────────────
    layout: {
      padding: { top: 10, bottom: 0, left: 0, right: 0 },
    },

    // ── Escalas ───────────────────────────────────────────
    scales: {
      x: {
        grid: {
          display: false, // sin grilla vertical
        },
        border: {
          display: false, // sin borde del eje X
        },
        ticks: {
          color: '#9CA3AF',
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        max: 800000,
        grid: {
          color: 'rgba(0,0,0,0.06)',    // líneas horizontales muy suaves
          lineWidth: 1,
          drawTicks: false,
          // Líneas punteadas
          borderDash: [4, 4],
        },
        border: {
          display: false, // sin borde del eje Y
          dash: [4, 4],
        },
        ticks: {
          color: '#9CA3AF',
          font: { size: 12 },
          // Formato de moneda colombiana
          callback: (value) =>
            '$ ' + value.toLocaleString('es-CO'),
          stepSize: 100000,
          padding: 8,
        },
      },
    },

    // ── Plugins ───────────────────────────────────────────
    plugins: {
      legend: {
        display: false, // sin leyenda (el título está fuera del canvas)
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#ffffff',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) =>
            '$ ' + context.parsed.y.toLocaleString('es-CO'),
        },
      },
    },
  },
};

const chart = new Chart(ctx, config);
```

---

## 5. Estilos CSS del card contenedor

```css
/* Fuente recomendada */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

* {
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  width: 460px;          /* ajustar según layout */
  max-width: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu {
  font-size: 20px;
  color: #9CA3AF;
  cursor: pointer;
  letter-spacing: 2px;
  user-select: none;
}

canvas {
  display: block;
}
```

---

## 6. Propiedades clave del dataset

| Propiedad | Valor usado | Propósito |
|---|---|---|
| `backgroundColor` | `rgba(178, 216, 216, 0.85)` | Color de relleno de las barras |
| `hoverBackgroundColor` | `rgba(140, 195, 195, 1)` | Color al hacer hover |
| `borderRadius` | `8` | Redondeo de las esquinas superiores |
| `borderSkipped` | `'bottom'` | Redondear solo la parte superior |
| `barPercentage` | `0.55` | Controla el ancho de la barra |
| `categoryPercentage` | `0.8` | Espacio entre grupos de barras |

---

## 7. Opciones de escala destacadas

### Eje Y – grilla punteada

```javascript
y: {
  grid: {
    color: 'rgba(0,0,0,0.06)',
    borderDash: [4, 4],   // 4px trazo, 4px espacio → línea punteada
  },
  border: { display: false },
}
```

### Eje Y – formato de moneda

```javascript
ticks: {
  callback: (value) => '$ ' + value.toLocaleString('es-CO'),
  stepSize: 100000,
}
```

### Eje X – sin grilla ni borde

```javascript
x: {
  grid: { display: false },
  border: { display: false },
}
```

---

## 8. Tooltip personalizado (estilo card claro)

El diseño de la imagen 2 muestra un tooltip con fondo blanco y borde suave. Se logra con:

```javascript
tooltip: {
  backgroundColor: '#ffffff',
  titleColor: '#374151',
  bodyColor: '#374151',
  borderColor: '#E5E7EB',
  borderWidth: 1,
  padding: 12,
  cornerRadius: 8,
  displayColors: false,   // sin el cuadrito de color del dataset
  callbacks: {
    label: (ctx) => '$ ' + ctx.parsed.y.toLocaleString('es-CO'),
  },
}
```

---

## 9. Ejemplo completo (HTML standalone)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Histórico de Ingresos</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      background: #F3F4F6;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      font-family: 'Inter', sans-serif;
    }
    .card {
      background: #fff;
      border-radius: 16px;
      padding: 20px 24px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      width: 460px;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .card-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #111827;
    }
    .menu { color: #9CA3AF; font-size: 20px; letter-spacing: 2px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <h3>Histórico de Ingresos 📊</h3>
      <span class="menu">···</span>
    </div>
    <canvas id="ingresoChart"></canvas>
  </div>

  <script>
    const ctx = document.getElementById('ingresoChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        datasets: [{
          data: [400000, 700000, 400000, 300000, 400000],
          backgroundColor: 'rgba(178, 216, 216, 0.85)',
          hoverBackgroundColor: 'rgba(140, 195, 195, 1)',
          borderWidth: 0,
          borderRadius: 8,
          borderSkipped: 'bottom',
          barPercentage: 0.55,
          categoryPercentage: 0.8,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#374151',
            bodyColor: '#374151',
            borderColor: '#E5E7EB',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: (ctx) => '$ ' + ctx.parsed.y.toLocaleString('es-CO'),
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#9CA3AF', font: { size: 12 } },
          },
          y: {
            beginAtZero: true,
            max: 800000,
            grid: {
              color: 'rgba(0,0,0,0.06)',
              borderDash: [4, 4],
              drawTicks: false,
            },
            border: { display: false, dash: [4, 4] },
            ticks: {
              color: '#9CA3AF',
              font: { size: 12 },
              padding: 8,
              stepSize: 100000,
              callback: (v) => '$ ' + v.toLocaleString('es-CO'),
            },
          },
        },
      },
    });
  </script>
</body>
</html>
```

---

## 10. Checklist de implementación

- [ ] Importar Chart.js (CDN o npm)
- [ ] Crear elemento `<canvas>` dentro del card contenedor
- [ ] Definir `labels` con los días/periodos correspondientes
- [ ] Definir `data` con los valores numéricos del eje Y
- [ ] Aplicar `backgroundColor` con tono teal/azul claro
- [ ] Configurar `borderRadius: 8` y `borderSkipped: 'bottom'`
- [ ] Desactivar `grid.display` en el eje X
- [ ] Aplicar `borderDash: [4, 4]` en la grilla del eje Y
- [ ] Formatear los ticks del eje Y con `toLocaleString('es-CO')`
- [ ] Personalizar el tooltip con fondo blanco y borde suave
- [ ] Ocultar la leyenda (`legend.display: false`)
- [ ] Agregar el encabezado del card con título e ícono fuera del canvas