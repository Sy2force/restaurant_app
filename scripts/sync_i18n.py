#!/usr/bin/env python3
"""Sync i18n keys across en/fr/he translation files without removing anything.

Adds any missing keys from the most-complete file into the others. Preserves
existing translations. Idempotent.
"""
import json
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PUB = os.path.join(ROOT, 'frontend', 'public', 'locales')

FILES = {
    'en': os.path.join(PUB, 'en', 'translation.json'),
    'fr': os.path.join(PUB, 'fr', 'translation.json'),
    'he': os.path.join(PUB, 'he', 'translation.json'),
}


def load(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)


def save(p, d):
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(d, f, indent=2, ensure_ascii=False)
        f.write('\n')


def flat(d, prefix=''):
    out = {}
    if isinstance(d, dict):
        for k, v in d.items():
            out.update(flat(v, prefix + k + '.'))
    else:
        out[prefix[:-1]] = d
    return out


def set_path(d, path, value):
    parts = path.split('.')
    cur = d
    for p in parts[:-1]:
        if p not in cur or not isinstance(cur[p], dict):
            cur[p] = {}
        cur = cur[p]
    if parts[-1] not in cur:
        cur[parts[-1]] = value


# --- Explicit translations for known missing keys ---
EXPLICIT = {
    'fr': {
        'landing.cta.title': 'Prêt à Déguster ?',
        'landing.cta.subtitle': "Rejoignez l'aventure Flavors of Israel dès aujourd'hui.",
        'landing.cta.share.title': 'Partager',
        'landing.cta.share.desc': 'Publiez vos découvertes culinaires',
        'landing.cta.share.buttonAuth': 'Créer une publication',
        'landing.cta.share.buttonGuest': 'Rejoindre pour partager',
        'landing.cta.restaurant.title': 'Professionnels',
        'landing.cta.restaurant.desc': "Boostez la visibilité de votre restaurant",
        'landing.cta.restaurant.buttonAuth': 'Accéder au tableau de bord',
        'landing.cta.restaurant.buttonGuest': 'Créer un compte pro',
        'landing.restaurants.title': 'Adresses Vedettes',
        'landing.restaurants.subtitle': 'Les meilleures adresses sélectionnées pour vous',
        'landing.restaurants.discover': 'Découvrir',
        'landing.restaurants.viewAll': 'Voir tous les restaurants',
        'landing.testimonials.title': 'Paroles de la communauté',
        'landing.testimonials.subtitle': 'Ce que disent nos foodies passionnés',
    },
    'he': {
        'common.print': 'הדפסה',
        'common.share': 'שיתוף',
        'recipeDetail.loadError': 'שגיאה בטעינת המתכון',
        'recipeDetail.notFound': 'המתכון לא נמצא',
    },
    'en': {
        'auth.registerPage.heroTitle': 'Join Flavors of Israel',
        'auth.registerPage.heroDesc': 'Create your account to share, save and explore Israeli cuisine.',
        'auth.registerPage.benefits.save': 'Save your favorite recipes and dishes',
        'auth.registerPage.benefits.share': 'Share your creations with the community',
        'auth.registerPage.benefits.discover': 'Discover restaurants near you',
        'auth.registerPage.benefits.business': 'Manage your restaurant if you are a professional',
    },
}


def main():
    data = {lang: load(p) for lang, p in FILES.items()}

    # 1) Apply explicit translations.
    for lang, kv in EXPLICIT.items():
        for k, v in kv.items():
            set_path(data[lang], k, v)

    # 2) Cross-fill: for any key present in any language but missing in others,
    # copy the value from the most complete source as a fallback (won't overwrite existing).
    all_flats = {lang: flat(data[lang]) for lang in data}
    union = set().union(*[set(f.keys()) for f in all_flats.values()])
    for key in union:
        for lang in data:
            if key not in all_flats[lang]:
                # Prefer English as fallback, then French, then Hebrew.
                for src in ('en', 'fr', 'he'):
                    if key in all_flats[src]:
                        set_path(data[lang], key, all_flats[src][key])
                        break

    # Recompute and report.
    all_flats = {lang: flat(data[lang]) for lang in data}
    for lang in data:
        missing = union - set(all_flats[lang].keys())
        print(f'{lang}: {len(all_flats[lang])} keys, missing={len(missing)}')

    for lang, p in FILES.items():
        save(p, data[lang])
    print('Saved all locales.')


if __name__ == '__main__':
    main()
