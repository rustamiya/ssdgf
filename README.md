# OMAR CANTER — عمر سنتر

Self-contained static PS4 host. Upload the contents of this directory to the root
of omarcanter/omarcanter.github.io (main branch). Pages: main / root.
Launch stays on the same origin at host/index.html. No iframe or external loader.
The package includes the selected upstream scripts, patch files, and payload.

Upstream: https://github.com/GamerHack/GamerHack.github.io
Pinned source: d290adc45e15d2ce06bd6d0fa5388b5de868c4d2
Payload: goldhen_2.4b18.12.bin
Firmware allowlist: 9.00, 9.03, 9.04, 9.50, 9.51, 9.60, 10.00, 10.01, 10.50, 10.70, 10.71, 11.00, 11.02, 11.50, 11.52, 12.00, 12.02, 12.50, 12.52, 13.00, 13.02, 13.04, 13.50, 13.52

Changes: shop branding, exact firmware gates, local paths, cache UI and manifests,
disabled unsupported telemetry POSTs. Exploit primitives and binary bytes were
not changed. Upstream copyright notices retained; PSFree is AGPL-3.0-or-later.
Other upstream components retain their respective terms; no new blanket license.
Full source is provided in this package and intended public repository.

Validation: static dependency and manifest resolution, firmware routing with
stubbed DOM (no exploit execution), ZIP integrity. Not tested on actual PS4.
Hardware operation and offline-cache behavior still require a console test.
Do not update console firmware to match this site.
