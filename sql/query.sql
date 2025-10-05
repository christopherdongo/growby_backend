-- Plantas
INSERT INTO "Planta" ("nombre") VALUES
('Planta Cusco'),
('Planta Arequipa'),
('Planta Lima');

-- Operaciones
INSERT INTO "Operacion" ("nombre", "plantaId") VALUES
('Molienda Inicial', 1),
('Filtrado y Secado', 1),
('Empaque Final', 1),
('Corte de Materia Prima', 2),
('Pulido y Control de Calidad', 2),
('Ensacado', 3),
('Transporte y Logística', 3);

-- Costos Indirectos
INSERT INTO "CostoIndirecto" ("rango", "costo", "operacionId") VALUES
('300kg', 150.50, 1),
('500kg', 210.75, 1),
('1T', 390.00, 1),
('300kg', 180.25, 2),
('500kg', 240.80, 2),
('1T', 420.10, 2),
('300kg', 160.50, 3),
('500kg', 230.40, 3),
('1T', 400.00, 3),
('300kg', 170.90, 4),
('500kg', 250.10, 4),
('1T', 430.75, 4),
('300kg', 190.50, 5),
('500kg', 260.60, 5),
('1T', 440.20, 5),
('300kg', 200.80, 6),
('500kg', 270.40, 6),
('1T', 450.00, 6),
('300kg', 210.10, 7),
('500kg', 280.20, 7),
('1T', 460.50, 7);