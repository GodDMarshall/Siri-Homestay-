-- The site shows the owners' photographs again; the 3D estate and its camera flights are gone.
-- Points the two seeded stays at their photos: hero and card pictures, and the photos shown
-- side by side on each stay's page.
UPDATE room_types SET media_json = '{"hero":"villa-bedroom","card":"villa-bedroom","strip":["doorway-bedroom","villa-window-pool","villa-pool","bath-basin","bath-wc","villa-patio","patio-chairs","lawn-table-villa"]}', transition_json = '[]' WHERE slug = 'garden-villa';
UPDATE room_types SET media_json = '{"hero":"lawn-stepping-stones","card":"courtyard-villas","strip":["courtyard-villas","courtyard-villa","estate-lawn-dining","lawn-umbrellas","lawn-table-closeup","courtyard-garden","bamboo-view-lawn","night-garden","night-lawn","night-path"]}', transition_json = '[]' WHERE slug = 'whole-estate';
