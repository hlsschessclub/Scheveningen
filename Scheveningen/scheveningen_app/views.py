from django.shortcuts import render


def index(request):
    return render(request, 'index.html')

def team_details(request):
    return render(request, 'team-details.html')

def round_details(request):
    return render(request, 'round-details.html')

def current_standings(request):
    return render(request, 'current-standings.html')

def final_standings(request):
    return render(request, 'final-standings.html')

