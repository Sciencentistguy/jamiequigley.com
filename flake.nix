{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = inputs @ {
    self,
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.default = pkgs.mkShell {
        name = "jamiequigley.com";
        buildInputs = with pkgs; [nodejs];
      };

      packages.default = pkgs.buildNpmPackage {
        name = "jamiequigley.com";

        src = pkgs.lib.cleanSource ./.;

        npmDepsHash = "sha256-EZAIgilqFHO+HJ/SV4fjirFPxPLEMDGVjIgMSyilw8c=";

        installPhase = ''
          mkdir -p $out
          cp -a dist/. $out/
        '';
      };
      packages.website = self.packages.${system}.default;
    });
}
