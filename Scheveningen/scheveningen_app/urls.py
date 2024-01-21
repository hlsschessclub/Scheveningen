from django.urls import path

from . import views


app_name = 'scheveningen_app'
urlpatterns = [
    path('', views.index, name='index'),
    path('team-details/', views.team_details, name='team_details'),
    path('round-details/', views.round_details, name='round_details'),
    path('current-standings/', views.current_standings, name='current_standings'),
    path('final-standings/', views.final_standings, name='final_standings'),
]